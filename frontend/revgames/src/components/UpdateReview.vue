<template>
    <div class="container">
        <h1 class="text-center">Modifica Recensione</h1>
        <div class="form-group">
            <label for="rating">Rating:</label>
            <select class="form-control" v-model="editedReview.rating">
                <option value="">Seleziona un rating</option>
                <option value="1">1 stella</option>
                <option value="2">2 stelle</option>
                <option value="3">3 stelle</option>
                <option value="4">4 stelle</option>
                <option value="5">5 stelle</option>
            </select>
        </div>

        <div class="form-group">
            <label for="content">Contenuto:</label>
            <textarea class="form-control" rows="5" v-model="editedReview.description" @input="limitCharacters"></textarea>
            <small class="text-muted">Caratteri: {{ characterCount }}/255</small>
        </div>

        <button class="btn btn-primary btn-block" type="submit" :disabled="isSubmitting" @click="submitReview">Invia Recensione</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<script>
import instance from "@/axios";

export default {
    name: 'UpdateReview',
    props: {
        review: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editedReview: {
                rating: this.review.rating,
                description: this.review.description
            },
            characterCount: 0,
            isSubmitting: false,
            errorMessage: ''
        };
    },
    methods: {
        limitCharacters() {
            if (this.editedReview.description.length > 255) {
                this.editedReview.description = this.editedReview.description.slice(0, 255);
            }
            this.characterCount = this.editedReview.description.length;
        },
        async submitReview() {
            this.isSubmitting = true;
            try {
                // Logica per inviare la recensione al backend
                const parsedRating = parseInt(this.editedReview.rating, 10);
                const parsedReviewId = parseInt(this.review.id, 10);
                // const parsedGameId = parseInt(this.review.idGame, 10);
                const response = await instance.put("/review/updateReview", {
                    id: parsedReviewId,
                    rating: parsedRating,
                    description: this.editedReview.description
                });
                // Esegui il reset dei campi
                this.editedReview.rating = '';
                this.editedReview.description = '';
                this.characterCount = 0;

              if (response.status === 200)
                window.location.reload();
            } catch (error) {
              this.errorMessage = error.response.data.message;
            } finally {
              this.isSubmitting = false;
            }
        }
    },
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

h1 {
    font-size: 24px;
    margin-bottom: 30px;
}

.btn-block {
    margin-top: 20px;
}

.error-message {
    color: red;
    margin-top: 20px;
}
</style>
