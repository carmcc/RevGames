<template>
  <div>
    <h1>Pippo</h1>
    <h1 class="animate__animated animate__fadeInUp animate__delay-1s">Recensioni di {{titolo}}</h1>
  </div>    <!--TODO implementa la scritta "nessuna recensione"-->
  <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
    <div class="container">
      <div class="row animate__animated animate__fadeInUp animate__delay-1s">
        <ReviewComponent v-for="review in reviewList" :key="review.id" :review="review" :description="review.description" :rating="review.rating" :date="review.date" :userId="review.userId" :gameId="review.gameId" />
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
      // receivedUserId: {   //this.receivedUserId è l'id dell'utente loggato
      //   Type: String,
      //   required: false    //TODO da implementare
      // }
    },
    components: {
      ReviewComponent,
    },
    data() {
      return {
        reviewList: [], // Inizializza un array vuoto per le recensioni
        titolo: ""
      };
    },
    created() {
      instance.get(`/games/getGameById/${this.receivedGameId}`)
          .then(response => {
            this.titolo = response.data.title;
          })
    },
    mounted() {
      instance.get(`/review/allReviewsOfGame/${this.receivedGameId}`)   //Chiamata all'API del backend per ottenere le recensioni
          .then(response => {
            this.reviewList = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
</script>