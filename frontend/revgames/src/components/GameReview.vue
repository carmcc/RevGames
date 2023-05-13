<template>
  <div>
    <h1>eister egg</h1>
    <h1>Ecco una dannata lista</h1>
  </div>
  <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
    <div class="container">
      <div class="row animate__animated animate__fadeInUp animate__delay-1s">
        <ReviewComponent v-for="review in reviewList" :key="review.id" :review="review" :description="review.description" :rating="review.rating" :date="review.date" :userId="review.userId" :gameId="review.gameId" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import ReviewComponent from "@/components/ReviewComponent.vue"; // Importa il componente Review

export default {
  name: 'GameReview',
  props: {
    receivedId: {   //this.props.id è l'id del gioco sul quale si ha cliccato per accedere alla pagina
      type: Number,
      required: true,
    }
  },
  components: {
    ReviewComponent,
  },
  data() {
    return {
      reviewList: [], // Inizializza un array vuoto per le recenzioni
    };
  },
  created() {

  },
  mounted() {
    axios.get(`/review/allReviewsOfGame/${this.receivedId}`)   //Chiamata all'API del backend per ottenere le recenzioni
        .then(response => {
          this.reviewList = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  }
}
</script>