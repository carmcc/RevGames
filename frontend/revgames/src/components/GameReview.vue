<template>
  <div>
    <div class="container-mt-3">
      <h1 class="animate__animated animate__fadeInUp animate__delay-1s">{{ titoloPagina }}</h1>
    <div class=" game-banner animate__animated animate__fadeInUp animate__delay-0.5s">
      <div class="game-banner-image">
        <img :src="cardBannerUrl" :alt="game.title" />
      </div>
      <div class="game-banner-content">
        <h2>{{ game.title }}</h2>
        <p class="game-description">{{ game.description }}</p>
        <p class="game-rating">{{ratingView}} {{averageRating}}/5</p>
      </div>
    </div>
    <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
      <div class="container">
        <div class="row animate__animated animate__fadeInUp animate__delay-1s">
          <ReviewComponent v-for="review in reviewList" :key="review.id" :review="review" />
        </div>
      </div>
        <button class ="add-review" @click="navigateToAddReview" v-if="isLogged">Aggiungi Recensione</button>
    </div>
  </div>
  </div>
</template>

<script>
import ReviewComponent from "@/components/ReviewComponent.vue";
import instance from "@/axios";
import store from "@/store";

export default {
  name: 'GameReview',
  props: {
    receivedGameId: {   //this.receivedGameId è l'id del gioco di cui si vogliono vedere le recensioni
      type: String,
      required: true,
    },
    receivedUserId: {   //this.receivedUserId è l'id dell'utente loggato
      Type: String,
      required: false
    }
  }, components: {
    ReviewComponent,
  },
  data() {
    return {
      titoloPagina: "",
      rating: null,   //media dei voti generali
      reviewList: [], // Inizializza un array vuoto per le recensioni
      averageRating: 0,
      ratingView: "",   //testo che precede il valore di rating
      game: {   //game serve per il titolo e l'immagine del gioco
        bannerImageUrl: "",
        description: "",
        title: "",
      },
    };
  },
  computed: {
      isLogged() {
          return store.state.isLogged;
      },
    /**
     * Estrae dai file locali l'immagine indicata dal percorso presente tra i parametri di game
     *
     * @returns L'immagine del gioco specificato
     */
    cardBannerUrl() {
      return require(`../assets/${this.game.bannerImageUrl}`);
    }
  },
  async created() {
    await this.getGameById(this.receivedGameId)

    await instance.get('/api/protected')  //verifica dell'utente loggato e assegnamento valore loggedUsername
        .then(response => {
          this.loggedUsername = response.data.username;

          return instance.get(`/users/getUserIdByUsername/${this.loggedUsername}`); //dopo aver verificato l'utente, trovo l'id
        }).then(response2 => {
          this.loggedId = response2.data.userId;
        }).catch(error => {
          console.error(error);
        });

    if(!store.state.viewPressed)
        await this.visualizzazioneNormale()
    else
        await this.visualizzazioneLoggata()
  },
  methods: {
      navigateToAddReview() {
          // Utilizza il router per navigare alla pagina per aggiungere una recensione
          this.$router.push({
              name: 'AddReview',
              params: {
                  idUser: this.loggedId,
                  idGame: this.receivedGameId,
              },
          });
      },
    /**
     * Effettua una query al database per ottenere informazioni riguardo al gioco selezionato
     *
     * @param gameId
     */
    async getGameById(gameId) {
        await instance.get(`/games/getGameById/${gameId}`)   //definizione del gioco selezionato
            .then(response => {
                if(response.status === 200) {
                    this.game.title = response.data.title;
                    this.game.bannerImageUrl = response.data.url;
                    this.game.description = response.data.description;
                }
            }).catch(() => {
            this.$router.push("/error");
        });
    },

    /**
     * Visualizza tutte le recensioni del gioco ef imposta un titolo generico.
     */
    async visualizzazioneNormale() {

      this.titoloPagina = "Recensioni di " + this.game.title

      await instance.get(`/review/getAllReviewsOfGame/${this.receivedGameId}`)
          .then(response =>{
            this.reviewList = response.data
          })
      this.ratingView = "rating:"
      this.setAverageRating()   //imposto la media di tutte le recensioni
    },

    /**
     * Visualizza tutte le recensioni che l'utente ha fatto del gioco ed inposta un titolo col suo nome.
     */
    async visualizzazioneLoggata() {
      this.titoloPagina = "Recensioni di "+ this.game.title + " di " + this.loggedUsername

      await instance.get(`/review/getAllReviewsOfGameAndUser/${this.receivedGameId}/${this.loggedId}`)
          .then(response =>{
            this.reviewList = response.data
          })
      this.ratingView = "your rating:"
      this.setAverageRating()   //imposto la media delle recensioni effettuate dall'utente loggato
    },

    /**
     * Calcola la media dei rating delle recensioni presenti in reviewList e salva il risultato in averageRating
     */
    setAverageRating() {
      let average = 0

      for(let i = 0; i < this.reviewList.length; i++) {   //calcolo la media
        average = average + this.reviewList[i].rating
      }
      average = average / this.reviewList.length

      this.averageRating = average.toFixed(1)
    },
  }
}
</script>

<style scoped>
h1{
  margin-top: 50px;
}

.game-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.game-banner-image {
  flex: 0 0 40%;
  margin-right: 40px;
}

.game-banner-image img {
  max-width: 100%;
  border-radius: 8px;
}

.game-banner-content {
  flex: 1;
}

.game-banner-content h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.game-description {
  margin-bottom: 24px;
}

.album {
  padding-top: 40px;
  padding-bottom: 40px;
}
.add-review {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 20px;
  margin: 20px;
}

</style>