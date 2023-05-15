<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h4 class="font-weight-bold mb-0">Home</h4>
          </div>
          <div class="card-body">
            <p class="mb-0">Hello, welcome to my home library app!</p>
            <div v-if="!isLoggedIn" class="text-center mt-4">
              <button class="twitter-button" @click="goToLogin">Login</button>
              <button class="twitter-button" @click="goToRegister">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('access_token');
      this.isLoggedIn = !!token;
    },
    goToLogin() {
      this.$router.push({ name: 'Login' });
    },
    goToRegister() {
      this.$router.push({ name: 'Register' });
    },
  },
};
</script>

<style>
.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #ffffff;
  border-bottom: none;
}

.card-body {
  background-color: #ffffff;
}

h4 {
  color: #1da1f2;
}

.twitter-button {
  background-color: #1da1f2;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.twitter-button:hover {
  background-color: #0e71c8;
}
</style>
