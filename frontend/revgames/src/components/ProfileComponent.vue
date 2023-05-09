<template>
<h1>Profilo</h1>
</template>

<script>

export default {
  name: 'ProfileComponent',
  // methods: {
  //   mounted() {
  //     const response = axios.get('api/protected', localStorage.getItem('access_token'));
  //     console.log(response);
  //   },
  // }
}
// name: 'SignIn',
//     data() {
//   return {
//     username: '',
//     password: ''
//   }
// },
// methods: {
//   async loginUser() {
//     const response = await axios.post('auth/login', {
//       username: this.username,
//       password: this.password
//     });
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card {
  width: 400px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 2rem;
  text-align: center;
}

.card-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1.2rem;
  margin-bottom: 0;
}
</style>
