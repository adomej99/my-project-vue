<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="registerUser()">
      <label>
        Email:
        <input type="email" v-model="email">
      </label>
      <label>
        Username:
        <input type="text" v-model="username">
      </label>
      <label>
        Password:
        <input type="password" v-model="password">
      </label>
<!--      <label>-->
<!--        Confirm Password:-->
<!--        <input type="password" v-model="confirmPassword">-->
<!--      </label>-->
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from '@/config/axios';
export default {
  name: "RegisterPage",

  methods: {
    registerUser() {
      axios.post('/register', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
          .then(response => {
            console.log(response.data.message);
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
