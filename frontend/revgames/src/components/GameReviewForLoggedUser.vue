<template>
  <div>
    <div class="container-mt-3">
      <h1>pippo</h1>
      <h1 class="animate__animated animate__fadeInUp animate__delay-1s">recensioni di {{game.title}} di {{loggedUsername}}</h1>
      <div class=" game-banner animate__animated animate__fadeInUp animate__delay-0.5s">
        <div class="game-banner-image">
          <img :src="cardBannerUrl" :alt="game.title" />
        </div>
        <div class="game-banner-content">
          <h2>{{ game.title }}</h2>
          <p class="game-description">{{ game.description }}</p>
        </div>
      </div>
      <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
        <div class="container">
          <div class="row animate__animated animate__fadeInUp animate__delay-1s">
            <ReviewComponent v-for="review in reviewList" :key="review.id" :review="review" />
          </div>
        </div>
        <button class ="add-review" @click="navigateToAddReview">Aggiungi Recensione</button>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewComponent from "@/components/ReviewComponent.vue";
import instance from "@/axios";

export default {
  name: 'GameReview',
  props: {
    receivedGameId: {   //this.receivedGameId è l'id del gioco di cui si vogliono vedere le recensioni dell'utente loggato
      type: String,
      required: true,
    },
  }, components: {
    ReviewComponent,
  },
  data() {
    return {
      loggedUsername : null,
      loggedId : null,
      reviewList: [], // Inizializza un array vuoto per le recensioni
      game: {   //game serve per il titolo e l'immagine del gioco
        bannerImageUrl: "",
        description: "",
        title: "",
      },
    };
  },
  computed: {
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
    // await store.dispatch('checkLogin');

    this.getGameById(this.receivedGameId)

    await this.setUser()

    this.setReviewListForLoggedUser()
  },
  methods: {
    /**
     * Utilizza il router per navigare alla pagina per aggiungere una recensione
     */
    navigateToAddReview() {
      this.$router.push({
        name: 'AddReview',
        params: {
          idGame: this.receivedGameId,
        },
      });
    },

    /**
     * Effettua una query al database per ottenere informazioni riguardo al gioco selezionato
     *
     * @param gameId
     */
    getGameById(gameId) {
      instance.get(`/games/getGameById/${gameId}`)   //definizione del gioco selezionato
          .then(response => {
            this.game.title = response.data.title;
            this.game.bannerImageUrl = response.data.url;
            this.game.description = response.data.description;
          }).catch(error => {
        console.log("Utente non loggato: "+error);
      });
    },
    /**
     * Imposta username e userId dell'utente loggato
     */
    async setUser() {
      await instance.get('/api/protected')  //assegnamento valore loggedUsername
          .then(response => {
            this.loggedUsername = response.data.username;

            return instance.get(`/users/getUserIdByUsername/${this.loggedUsername}`); //dopo aver identificato l'utente, ottengo l'id
          }).then(response2 => {
            this.loggedId = response2.data.userId;
          }).catch(error => {
            console.error(error);
          });
    },

    /**
     * Visualizza tutte le recensioni che l'utente ha fatto del gioco e imposta un titolo col suo nome.
     */
    setReviewListForLoggedUser() {
      instance.get(`/review/getAllReviewsOfGameAndUser/${this.receivedGameId}/${this.loggedId}`)
          .then(response =>{
            this.reviewList = response.data
          })
    }
  }
}
</script>

<style scoped>
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