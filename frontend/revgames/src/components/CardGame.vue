<template>
  <div class="col-md-4">
    <div class="card mb-4 box-shadow" @click.stop="navigateToGameReviews" style="cursor: pointer">
      <img class="card-img-top" :src=cardImageUrl width="508" height="225" alt="{{ card.title }}">
      <div class="card-body">
        <p class="card-text" style="overflow: hidden; word-wrap: break-word" >{{ card.description }}</p>
        <p class="card-text">rating: {{averageRating}}/5</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" v-if="isLogged" @click.stop="viewPressed">My Reviews</button>
              <button type="button" class="btn btn-sm btn-outline-secondary" v-if="isLogged && isAdministrator" style="cursor: pointer" @click.stop="editPressed">Edit</button>
              <button type="button" class="btn btn-sm btn-outline-secondary" v-if="isLogged && isAdministrator" style="cursor: pointer" @click.stop="confirmDelete">Delete</button>
          </div>
<!--          <small class="text-muted">9 mins</small>-->
        </div>
      </div>

    </div>
      <UpdateGame v-if="isModify" :game="card" @modifica_gioco_inviata="hideUpdateGame" />
  </div>
</template>

<script>
import store from '../store';
import instance from "@/axios";
import UpdateGame from "@/components/UpdateGame.vue";

export default {name: "CardGame",
    components: {UpdateGame},
    props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      averageRating: 0,
      isModify: false
    }
  },
  computed: {
    cardImageUrl() {
      return require(`../assets/${this.card.url}`);
    },
    isLogged(){
      return store.state.isLogged
    },
      isAdministrator(){
      return store.state.isAdministrator
    },
    // averageRating() {
    //   let output = this.getAverageRating()
    //   console.log(`average of ${this.card.title} = ${output}`)
    //   return output
    // },
  },
  async created() {
    let reviewList= null
    let average = 0

    await instance.get(`/review/getAllReviewsOfGame/${this.card.id}`)
        .then(response =>{
          reviewList = response.data    //ottengo la lista recensioni del gioco

          for(let i=0; i < reviewList.length; i++) {    //calcolo la media
            average = average + reviewList[i].rating
          }
          average = average / reviewList.length

          this.averageRating = average.toFixed(1)  //imposto il risultato approssimato
        })
  },
  methods: {
    navigateToGameReviews() {
      store.commit('setViewPressed', false);
      this.$router.push(`/gameReview/${this.card.id}`);
    },

    viewPressed() {
      store.commit('setViewPressed', true);
      this.$router.push(`/gameReview/${this.card.id}`);
    },
    editPressed() {
        if(this.isLogged && this.isAdministrator){
            this.isModify = !this.isModify
        }
    },
    deletePressed() {
        if(this.isLogged && this.isAdministrator){
            instance.delete(`/game/deleteGame/${this.card.id}`)
                .then(() => {
                    console.log("Gioco eliminato con successo");
                    window.location.reload();
                })
                .catch(() => {
                    console.log("Errore durante l'eliminazione del gioco");
                });
        }
    },
      confirmDelete() {
          if (confirm("Are you sure you want to delete?")) {
              this.deletePressed();
          }
      },
    hideUpdateGame() {
        this.isModify = false
    }
  }}
</script>

<style scoped>

</style>