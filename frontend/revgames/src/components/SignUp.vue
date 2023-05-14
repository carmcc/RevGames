<template>
  <form  @submit.prevent="registerUser">
    <h1 class="h3 mb-3 font-weight-normal animate__animated animate__fadeInUp animate__delay-0.5s">Please sign up</h1>
      <div>
        <label>Username:</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required>
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
    <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="isSubmitting">Sign up</button>
  </form>
</template>

<script>
import axios from '../axios';

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            isSubmitting: false
        }
    },
    methods: {
        async registerUser() {
            this.isSubmitting = true;
            try {
                await axios.post('auth/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });
                this.$router.push('/signin');
            } catch (error) {
                console.log(error);
            } finally {
                this.isSubmitting = false;
            }
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