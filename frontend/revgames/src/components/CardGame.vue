<template>
<!--  <router-link to="/signup"/>-->
  <div class="col-md-4">
    <div class="card mb-4 box-shadow" @click="navigateToGame" style="cursor: pointer">
      <img class="card-img-top" src="../assets/cod.jpeg" width="508" height="225" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
<!--        <router-link to="/signup">Play</router-link>-->
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
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
  methods: {
    navigateToGame() {
      this.$router.push(`/signup`);
    }
  }
}
</script>

<style scoped>

</style>