<template>
  <form @submit.prevent="loginUser">
    <!--    <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <div>
      <label>Username:</label>
      <input type="text" v-model="username" required>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" v-model="password" required>
    </div>
    <!--      <div>-->
    <!--        <button type="submit">Registrati</button>-->
    <!--      </div>-->
    <!--    <div class="checkbox mb-3">-->
    <!--      <label>-->
    <!--        <input type="checkbox" value="remember-me"> Remember me-->
    <!--      </label>-->
    <!--    </div>-->
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  </form>
</template>

<script>
import axios from '../axios';
export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async loginUser() {
      const response = await axios.post('auth/login', {
        username: this.username,
        password: this.password
      });
      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      this.$router.push('/');
    }
  }

}
</script>

<style scoped>
form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


label {
  font-weight: bold;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0062cc;
}

</style>