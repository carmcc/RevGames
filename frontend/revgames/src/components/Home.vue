<template>
    <section class="jumbotron text-center">
        <div class="container">
            <h1 class="jumbotron-heading animate__animated animate__fadeInUp animate__delay-0.5s">Benvenuto/a {{username}}</h1>
            <p class="lead text-muted animate__animated animate__fadeInUp animate__delay-1s">
              RevGames è un sito dedicato a fornire recensioni accurate, e dettagliate sui videogiochi più popolari del momento.
              Buon divertimento!
            </p>
        </div>
    </section>

    <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
        <div class="container">
            <div class="row animate__animated animate__fadeInUp animate__delay-1s">
                <CardGame v-for="card in cardLeaders" :key="card.id" :card="card"/>
            </div>
        </div>
    </div>

</template>

<script>
import CardGame from './CardGame.vue'; // Importa il componente CardGame
import instance from "@/axios";
export default {
    name: 'HomePage',
    components: {
        CardGame,
    },
    data() {
        return {
            cardLeaders: [], // Inizializza un array vuoto per i capi delle carte
            username: ''
        };
    },
    methods: {
        async getListOfGames(){
            await instance.get('/games/myGames')
                .then(response => {
                    this.cardLeaders = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    created() {
        this.getListOfGames();
    },
    beforeUpdate() {
        this.username = localStorage.getItem('username');
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
:root {
    --jumbotron-padding-y: 3rem;
}

.jumbotron {
    padding-top: var(--jumbotron-padding-y);
    padding-bottom: var(--jumbotron-padding-y);
    margin-bottom: 0;
    background-image: url('../assets/wallpaper.jpeg')}
@media (min-width: 768px) {
    .jumbotron {
        padding-top: calc(var(--jumbotron-padding-y) * 2);
        padding-bottom: calc(var(--jumbotron-padding-y) * 2);
    }
}

.jumbotron p:last-child {
    margin-bottom: 0;
}

.jumbotron-heading {
    font-weight: 300;
}

.jumbotron .container {
    max-width: 40rem;
}
</style>
