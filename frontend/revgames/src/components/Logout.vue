<template>
<h1>Non sei piu loggato</h1>
</template>

<script>
import axios from "@/axios";

export default {
  name: "LogoutComponent",
  created() {
    this.logoutUser();
  },
  methods: {
    async logoutUser() {
      await axios.post('/auth/logout');
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>