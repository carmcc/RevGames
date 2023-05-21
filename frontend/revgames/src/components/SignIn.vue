<template>
  <form @submit.prevent="loginUser">
    <!--    <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
    <h1 class="h3 mb-3 font-weight-normal animate__animated animate__fadeInUp animate__delay-0.5s">Please sign in</h1>
    <div v-if="isSubmitting" class="alert alert-info" role="alert">
      <strong>Logging in...</strong>
    </div>
      <div v-if="isSubmitting">
        <div class="spinner-border small-spinner text-primary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    <div>
      <label>Username:</label>
      <input type="text" v-model="username" required>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" v-model="password" required>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="isSubmitting">Sign in</button>
      <div v-if="errorMessage" class ="error-message">{{errorMessage}}</div>
  </form>
</template>

<script>
import instance from '@/axios';
export default {
    name: 'SignIn',
    data() {
        return {
            username: '',
            password: '',
            isSubmitting: false,
            errorMessage: ''
        };
    },
    methods: {
        async loginUser() {
            this.isSubmitting = true;
            try {
                const response = await instance.post('auth/login', {
                    username: this.username,
                    password: this.password
                });
                this.$store.dispatch('login', {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    username: this.username
                });
              if (response.status === 200)
                this.$router.push('/');
            } catch (error) {
                this.errorMessage = error.response.data.message;
            } finally {
                this.isSubmitting = false;
            }
        }
    }
};
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
.small-spinner {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 0.2em;
}
.error-message {
    color: red;
    font-weight: bold;
}
</style>