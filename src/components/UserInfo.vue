<template>
  <div class="container">
    <div class="profile-container">
      <div class="profile-info">
        <h1 class="profile-name">{{ userInfo.username }}</h1>
        <div class="profile-rating">
          <StarRating :rating="userInfo.rating" />
        </div>
        <ul class="profile-details">
          <li class="profile-item"><i class="fa fa-envelope"></i> {{ userInfo.email }}</li>
          <li class="profile-item"><i class="fa fa-phone"></i> {{ userInfo.number }}</li>
          <li class="profile-item"><i class="fa fa-globe"></i> {{ userInfo.region }}</li>
          <li class="profile-item"><i class="fa fa-map-marker"></i> {{ userInfo.municipality }}</li>
          <li class="profile-item"><i class="fa fa-info-circle"></i> {{ userInfo.other }}</li>
        </ul>
      </div>
      <div class="profile-pic">
        <img src="../assets/logo.png" alt="Profile picture" />
      </div>
    </div>

    <div class="reviews-container">
      <h2 class="section-title">Reviews:</h2>
      <ul class="reviews-list">
        <li v-for="review in userInfo.review" :key="review.review" class="review-item">
          <div class="review-content">
            <div class="review-header">
              <span class="reviewer-name">{{ review.reviewedBy }}</span>
              <div class="review-rating">
                <StarRating :rating="review.rating" />
              </div>
            </div>
            <div class="review-text">{{ review.review }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StarRating from '@/components/NewStarRating.vue';
import axios from '@/config/axios';

export default {

  components: {
    StarRating
  },

  data() {
    return {
      userInfo: {}
    };
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      const userId = this.$route.params.userId;
      axios.get(`/users/${userId}`)
          .then(response => {
            this.userInfo = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}

.profile-container {
  align-items: center;
  display: flex;
  margin-bottom: 20px;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 32px;
  margin: 0 0 10px;
}

.profile-rating {
  margin-bottom: 10px;
}

.profile-details {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.profile-item {
  font-size: 14px;
  margin-bottom: 5px;
}

.profile-item i {
  margin-right: 5px;
}

.profile-pic {
  margin-left: 20px;
  width: 100px;
}

.profile-pic img {
  border-radius: 50%;
  width: 100%;
}

.reviews-container {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0.1);
  padding: 20px;
}

.section-title {
  font-size: 24px;
  margin: 0 0 20px;
}

.reviews-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.review-item {
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  padding-bottom: 20px;
}

.review-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.reviewer-name {
  font-weight: bold;
  margin-right: 10px;
}

.review-rating {
  margin-left: 10px;
}

.review-text {
  font-size: 16px;
  line-height: 1.4;
}
</style>
