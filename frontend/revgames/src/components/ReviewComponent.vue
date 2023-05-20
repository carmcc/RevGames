<!--<template>-->
<!--  <div class="col-md-4">-->
<!--    <div class="review-body">-->
<!--      <P class="review-body">{{nomeUtente}} {{review.rating}}/5</p>-->
<!--      <p class="review-text">{{ review.description }}</p>-->
<!--      <div class="d-flex justify-description-between align-items-center">-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div class="col-md-4">
    <div class="review-box">
      <div class="review-body">
        <p class="review-header">
          <b>{{nomeUtente}}</b> {{review.rating}}/5
        </p>
        <p class="review-text">{{review.description}}</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>
</template>


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
      nomeUtente : "account non più esistente",
    };
  },
  created() {
    instance.get(`/users/getUsernameById/${this.review.userId}`)
        .then(response => {
          this.nomeUtente = response.data.username;
        })
        .catch(error => {
          console.error(error);
        });
  }
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