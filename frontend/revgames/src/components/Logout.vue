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
        try{
            await axios.post('/auth/logout');
            this.$store.dispatch('logout');
        } catch (error) {
            console.log("Utente non autorizzato token non trovato:"+error.message);
        }
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>