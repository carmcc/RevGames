<template>
    <div>
        <h1>Pippo</h1>
        <h1 class="animate__animated animate__fadeInUp animate__delay-1s">Recensioni di {{game.title }}</h1>
        <div class="game-banner">
            <img :src=cardBannerUrl :alt="game.title"/>
            <p class="game-description">{{ game.description }}</p>
        </div>
        <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
            <div class="container">
                <div class="row animate__animated animate__fadeInUp animate__delay-1s">
                    <ReviewComponent v-for="review in reviewList" :key="review.id" :review="review" />
                </div>
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
        receivedGameId: {   //this.receivedGameIdid è l'id del gioco sul quale si ha cliccato per accedere alla pagina
            type: String,
            required: true,
        },
        receivedUserId: {   //this.receivedUserId è l'id dell'utente loggato
          Type: String,
          required: false
        }
    },
    components: {
        ReviewComponent,
    },
    data() {
        return {
            reviewList: [], // Inizializza un array vuoto per le recensioni
            game: {   //game serve per il titolo e l'immagine del gioco
                bannerImageUrl: "",
                description: "",
                title: "",
            },
        };
    },
    computed: {
        cardBannerUrl() {   //effettiva estrazione dell'immagine dai file locali
            return require(`../assets/${this.game.bannerImageUrl}`);
        }
    },
    created() {   //effettiva estrazione dei dati dal database
        instance.get(`/games/getGameById/${this.receivedGameId}`)
            .then(response => {
              this.game.title = response.data.title;
              this.game.bannerImageUrl = response.data.url;
              this.game.description = response.data.description;
            }).catch(error => {
          console.error(error);
        });
    },
    mounted() {
      if(this.receivedUserId==null) {   //se non è stato passato un userID, allora l'utente non è loggato e desidera vedere le recensioni di altri utenti
        instance.get(`/review/GetAllReviewsOfGame/${this.receivedGameId}`)   //Chiamata all'API del backend per ottenere le recensioni
            .then(response => {
                this.reviewList = response.data;
            })
            .catch(error => {
                console.error(error);
            });
      } else {    //se viene fornito anche l'userID, allora quest'ultimo è autenticato e vuole vedere le proprie recensioni, ma devo controllare che l'utente sia giusto.
        // if(controllo tra store.id e this.receivedUserId) {//TODO check dell'id dell'url con l'accessToken
        instance.get(`/users/usernameById/${this.receivedUserId}`)
            .then(response => {
              this.game.title = this.game.title + " di " + response.data
            })
        instance.get(`/review/getAllReviewsOfGameAndUser/${this.receivedGameId}/${this.receivedUserId}`)
            .then(response => {
              this.reviewList = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      // }
      }
    },
}
</script>