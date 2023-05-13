<template>
  <div class="col-md-4">
    <div class="review-body">
      <P class="review-body">{{review.id}}</p>
      <p class="review-text">{{ review.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
      </div>
    </div>
  </div>
</template>

<script>
//let nomeUtente = axios.get(``); //TODO aggiungi la possibilità di vedere gli autori dei commenti
export default {
    name: "ReviewComponent",
    props: {
      review: {
        type: Object,
        required: true
      }
    },
  computed: {
    cardImageUrl() {
      return require(`../assets/${this.card.url}`);
    }
  }
  }
</script>

<style scoped>

</style>