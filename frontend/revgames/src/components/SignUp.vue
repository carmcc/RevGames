<template>
  <form  @submit.prevent="registerUser">
    <h1 class="h3 mb-3 font-weight-normal animate__animated animate__fadeInUp animate__delay-0.5s">Please sign up</h1>
    <div v-if="isSubmitting" class="alert alert-info" role="alert">
      <strong>Registering...</strong>
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
      <div v-if="errorMessage" class ="error-message">{{errorMessage}}</div>
  </form>
</template>

<script>
import instance from "@/axios";

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            isSubmitting: false,
            errorMessage: ''
        }
    },
    methods: {
        async registerUser() {
            this.isSubmitting = true;
            try {
                const response = await instance.post('auth/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });
                if(response.status === 201)
                    this.$router.push('/signin');
            } catch (error) {
                this.errorMessage = error.response.data.message;
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