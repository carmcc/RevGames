<template>
    <div class="col-md-4">
        <div class="review-box" @click.stop="modifyReview">
            <div class="review-body">
                <p class="review-header">
                    <b>{{nomeUtente}}</b> {{review.rating}}/5
                </p>
                <p class="review-text" style="overflow: hidden; word-wrap: break-word;">{{review.description}}</p>
            </div>
        </div>
        <UpdateReview v-if="isModify" :review="review" @recensione-inviata="hideUpdateReview" />
    </div>
</template>



<script>
import instance from "@/axios";
import UpdateReview from "@/components/UpdateReview.vue";
import store from "@/store";
export default {
  name: "ReviewComponent",
    components: {
      UpdateReview
    },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nomeUtente : "account non più esistente",
      isModify: false,
        usernameByAccess: "",
        usernameByIdReview: "account non più esistente",
    };
  },
    computed: {
        isLogged() {
            return store.state.isLogged
        },
    },
  created() {
    instance.get(`/users/getUsernameById/${this.review.userId}`)
        .then(response => {
          this.nomeUtente = response.data.username;
        })
        .catch(() => {
          console.log("Commento anonimo!");
        });
    this.getUsernameByAccessToken();
    this.getUsernameById();
  },
  methods: {
       async getUsernameByAccessToken(){
           await instance.get("/api/protected").then((response) => {
              this.usernameByAccess = response.data.username;
          }).catch(() => {
              console.log("Non sono riuscito a prendere username da access token");
          });
      },
       async getUsernameById(){
           await instance.get(`/users/getUsernameById/${this.review.userId}`).then((response) => {
              this.usernameByIdReview= response.data.username;
          }).catch(() => {
              console.log("Non sono riuscito a prendere username da id");
          });
      },
    async modifyReview() {
        if(this.usernameByIdReview === this.usernameByAccess)
          this.isModify = !this.isModify;
    },
      hideUpdateReview() {
          this.isModify = false;
      }
  },

}
</script>

<style scoped>

.review-box {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
}

.review-box:hover{
  padding: 25px;
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.review-header {
  font-size: 18px;
  margin-bottom: 8px;
}

.review-text {
  font-size: 14px;
  line-height: 1.4;
}

</style>