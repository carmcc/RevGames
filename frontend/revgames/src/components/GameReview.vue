<template>
    <div>
        <h1>Pippo</h1>
        <h1 class="animate__animated animate__fadeInUp animate__delay-1s">Recensioni di {{game.title }}</h1>
        <div class="game-banner">
            <img :src=cardBannerUrl :alt="game.title"/>
            <p class="game-description">{{ game.description }}</p>
        </div>
        <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
            <div class="container">
                <div class="row animate__animated animate__fadeInUp animate__delay-1s">
                    <ReviewComponent v-for="review in reviewList" :key="review.id" :review="review" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewComponent from "@/components/ReviewComponent.vue";
import instance from "@/axios";

export default {
    name: 'GameReview',
    props: {
        receivedGameId: {   //this.receivedGameIdid è l'id del gioco sul quale si ha cliccato per accedere alla pagina
            type: String,
            required: true,
        },
        // receivedUserId: {   //this.receivedUserId è l'id dell'utente loggato
        //   Type: String,
        //   required: false    //TODO da implementare
        // }
    },
    components: {
        ReviewComponent,
    },
    data() {
        return {
            reviewList: [], // Inizializza un array vuoto per le recensioni
            game: {
                bannerImageUrl: "",
                description: "",
                title: "",
            },
        };
    },
    computed: {
        cardBannerUrl() {
            return require(`../assets/${this.game.bannerImageUrl}`);
        }
    },
    created() {
        instance.get(`/games/getGameById/${this.receivedGameId}`)
            .then(response => {
                this.game.title = response.data.title;
                this.game.bannerImageUrl = response.data.url;
                this.game.description = response.data.description;
            }).catch(error => {
            console.error(error);
        });
    },
    mounted() {
        instance.get(`/review/allReviewsOfGame/${this.receivedGameId}`)   //Chiamata all'API del backend per ottenere le recensioni
            .then(response => {
                this.reviewList = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>