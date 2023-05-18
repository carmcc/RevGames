<template>
  <!--  <router-link to="/signup"/>-->
  <div class="col-md-4">
    <div class="card mb-4 box-shadow" @click="navigateToGameReviews" style="cursor: pointer">
      <img class="card-img-top" :src=cardImageUrl width="508" height="225" alt="{{ card.title }}">
      <div class="card-body">
        <p class="card-text">{{ card.description }}</p>
        <!--        <router-link to="/signup">Play</router-link>-->
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" style="cursor: pointer">Edit</button>
          </div>
          <small class="text-muted">9 mins</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from '../axios';

export default {
  name: "CardGame",
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    cardImageUrl() {
      return require(`../assets/${this.card.url}`);
    }
  },
  methods: {
    navigateToGameReviews() {
      this.$router.push(`/gameReview/${this.card.id}`);
    },
    // navigateToGameReviewsForLoggedUser() {
    //   this.$router.push(`/gameReview/${this.card.id}/
    //     ${instance.get(`/users/getUserIdByUsername/${localStorage.getItem('username')}`)}`); //TODO non implementato
    // }
  }
}
</script>

<style scoped>

</style>