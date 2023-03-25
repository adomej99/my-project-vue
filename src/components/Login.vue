<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <label>
        Email:
        <input type="email" v-model="email">
      </label>
      <label>
        Password:
        <input type="password" v-model="password">
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {

  name: "Login",

  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      // Call a login method in the parent component with the email and password
      this.$emit('login', {
        email: this.email,
        password: this.password
      });
      // Clear the form data
      this.email = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>

</style>
