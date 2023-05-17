<!--<template>-->
<!--  <div class="col-md-4">-->
<!--    <div class="review-body">-->
<!--      <P class="review-body">{{nomeUtente}} {{review.rating}}/5</p>-->
<!--      <p class="review-text">{{ review.description }}</p>-->
<!--      <div class="d-flex justify-content-between align-items-center">-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div class="col-md-4">
    <div class="review-box">
      <div class="review-body">
        <p class="review-header">
          <b>{{nomeUtente}}</b>&nbsp;&nbsp;&nbsp;&nbsp;{{review.rating}}/5
        </p>
        <p class="review-text">{{review.description}}</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.review-box {
  background-color: #f1f1f1;
  border: 1px solid #000;
  padding: 10px;
}
.review-header {
  margin-bottom: 10px;
}
</style>


<script>
import instance from "@/axios";
export default {
    name: "ReviewComponent",
    props: {
      review: {
        type: Object,
        required: true
      }
    },
    data() {
    return {
      nomeUtente : "account non più esistente"
    };
  },
    methods: {
        async getUsernameOfReview(){
            await instance.get(`/users/usernameById/${this.review.userId}`)
                .then(response => {
                    this.nomeUtente = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
  created() {
    this.getUsernameOfReview();
  }
}
</script>

<style scoped>

</style>