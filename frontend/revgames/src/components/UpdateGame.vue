<template>
    <div class="game-form">
        <h2>Modifica gioco</h2>
        <form @submit.prevent="updateGame">
            <div class="form-group">
                <label for="title">Titolo</label>
                <input type="text" id="title" v-model="editGame.title" required>
            </div>
            <div class="form-group">
                <label for="description">Descrizione</label>
                <textarea id="description" v-model="editGame.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="url">URL</label>
                <input type="text" id="url" v-model="editGame.url" required>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="isSubmitting" >Modifica gioco</button>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </form>
    </div>
</template>

<script>
import instance from "@/axios";

export default {
    name: "UpdateGame",
    props: {
        game: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editGame: {
                id: this.game.id,
                title: this.game.title,
                description: this.game.description,
                url: this.game.url,
            },
          errorMessage: '',
          isSubmitting: false
        };
    },
  methods: {
    async updateGame() {
      this.isSubmitting = true;
      try {
        const response = await instance.put('/games/updateGame', {
          id: this.editGame.id,
          title: this.editGame.title,
          description: this.editGame.description,
          url: this.editGame.url
        });
        this.editGame.title = '';
        this.editGame.description = '';
        this.editGame.url = '';

        if (response.status === 200)
          window.location.reload();
      }
      catch (error) {
        this.errorMessage = error.response.data.message;
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style scoped>
.game-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.game-form h2 {
    text-align: center;
    margin-top: 0;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
.error-message {
    color: red;
    margin-bottom: 20px;
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
