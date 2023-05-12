<template>
    <section class="jumbotron text-center" style="background-image: url('./codmw.jpeg');">
        <div class="container">
            <h1 class="jumbotron-heading animate__animated animate__fadeInUp animate__delay-0.5s">Benvenuto/a {{username}}</h1>
            <p class="lead text-muted animate__animated animate__fadeInUp animate__delay-1s">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
            <p>
                <a href="#" class="btn btn-primary my-2">Main call to action</a>
                <a href="#" class="btn btn-secondary my-2">Secondary action</a>
            </p>
        </div>
    </section>

    <div class="album py-5 bg-light animate__animated animate__fadeInUp animate__delay-1s">
        <div class="container">
            <div class="row animate__animated animate__fadeInUp animate__delay-1s">
                <CardGame v-for="card in cardLeaders" :key="card.id" :card="card" :title="card.title" :description="card.description" :rating="card.rating" :url="card.url" />
            </div>
        </div>
    </div>

</template>

<script>
import axios from "@/axios";
import CardGame from './CardGame.vue'; // Importa il componente CardGame

export default {
    name: 'HomePage',
    components: {
        CardGame,
    },
    data() {
        return {
            cardLeaders: [], // Inizializza un array vuoto per i capi delle carte
        };
    },
    computed: {
        username() {
            return this.$store.state.username;
        },
    },
    mounted() {
// Chiama la tua API sul backend per ottenere i capi delle carte
// Esempio di chiamata API usando axios:
axios.get('/games/myGames')
  .then(response => {
    this.cardLeaders = response.data;
  })
  .catch(error => {
    console.error(error);
  });
    },
    async created() {
        const response = await axios.get('api/protected');
        this.$store.dispatch('checkLogin', {username: response.data.username});
        console.log(response);
    },
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
  background-color: #fff;
}
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

.box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }
</style>
