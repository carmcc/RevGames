<template>
    <div class="game-form">
        <h2>Inserisci un nuovo gioco</h2>
        <form @submit.prevent="addGame">
            <div class="form-group">
                <label for="title">Titolo</label>
                <input type="text" id="title" v-model="game.title" required>
            </div>
            <div class="form-group">
                <label for="description">Descrizione</label>
                <textarea id="description" style="resize:none" v-model="game.description" @input="limitCharacters" required></textarea>
                <small class="text-muted">Caratteri: {{ characterCount }}/255</small>
            </div>
            <div class="form-group">
                <label for="url">URL</label>
                <input type="text" id="url" v-model="game.url" required>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="isSubmitting">Aggiungi gioco</button>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
    </div>
</template>

<script>
import instance from "@/axios";

export default {
    name: "AddGame",
    data() {
        return {
            game: {
                title: '',
                description: '',
                url: '',
            },
            characterCount: 0,
            errorMessage: '',
          isSubmitting: false
        };
    },
  methods: {
      limitCharacters() {
          if (this.game.description.length > 255) {
              this.game.description = this.game.description.slice(0, 255);
          }
          this.characterCount = this.game.description.length;
      },
    async addGame() {
      this.isSubmitting = true;
      try {
        const response = await instance.post('/games/addGame', {
          title: this.game.title,
          description: this.game.description,
          url: this.game.url
        });
        this.game.title = '';
        this.game.description = '';
        this.game.url = '';
          this.characterCount = 0;


          if(response.status === 201)
          this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response.data.message;
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.game-form {
    max-width: 400px;
    margin:150px auto;
    //margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="text"],
textarea,
input[type="number"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 20px;
}
</style>
