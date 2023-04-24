<template>
  <div>
    <h1>{{ userInfo.username }}</h1>
    <div class="user-rating">
    <p>
      <span>Rating:</span>
      <StarRating :rating="userInfo.rating" />
    </p>
      </div>
    <p>Email: {{ userInfo.email }}</p>
    <p>Number: {{ userInfo.number }}</p>
    <p>Region: {{ userInfo.region }}</p>
    <p>Municipality: {{ userInfo.municipality }}</p>
    <p>Other Contacts: {{ userInfo.other }}</p>
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

<style scoped>
.user-rating {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  margin-right: 10px;
}
</style>
