<template>
  <!--  <router-link to="/signup"/>-->
  <div class="col-md-4">
    <div class="card mb-4 box-shadow" @click.stop="navigateToGameReviews" style="cursor: pointer">
      <img class="card-img-top" :src=cardImageUrl width="508" height="225" alt="{{ card.title }}">
      <div class="card-body">
        <p class="card-text">{{ card.description }}</p>
        <p class="card-text">rating: {{averageRating}}/5</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-if="isLogged" @click.stop="viewPressed">My Reviews</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" style="cursor: pointer">Edit</button>
          </div>
          <small class="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
import instance from "@/axios";

export default {name: "CardGame", props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      averageRating: 0
    }
  },
  computed: {
    cardImageUrl() {
      return require(`../assets/${this.card.url}`);
    },
    isLogged(){
      return store.state.isLogged
    },
    // averageRating() {
    //   let output = this.getAverageRating()
    //   console.log(`average of ${this.card.title} = ${output}`)
    //   return output
    // },
  },
  async created() {
    let reviewList= null
    let average = 0

    await instance.get(`/review/getAllReviewsOfGame/${this.card.id}`)
        .then(response =>{
          reviewList = response.data    //ottengo la lista recensioni del gioco

          for(let i=0; i < reviewList.length; i++) {    //calcolo la media
            average = average + reviewList[i].rating
          }
          average = average / reviewList.length

          this.averageRating = average  //imposto il risultato
        })
  },
  methods: {
    navigateToGameReviews() {
      store.commit('setViewPressed', false);
      this.$router.push(`/gameReview/${this.card.id}`);
    },

    viewPressed() {
      store.commit('setViewPressed', true);
      this.$router.push(`/gameReview/${this.card.id}`);
    }
  }}
</script>

<style scoped>

</style>