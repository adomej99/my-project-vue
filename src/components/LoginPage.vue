<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

import axios from '@/config/axios';

export default {

  name: "LoginPage",

  data() {
    return {
      username: '',
      password: '',
      token: '',
    };
  },
  methods: {
    loginUser() {
      axios.post('/login', {
        username: this.username,
        password: this.password,
      })
          .then(response => {
            console.log(response.data.session);
            this.session = response.data.session;
            localStorage.setItem('session', JSON.stringify(this.session));
            console.log(localStorage.getItem("session"))
            this.$router.push('/');
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>

</style>
