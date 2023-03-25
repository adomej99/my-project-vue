<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <label>
        Email:
        <input type="email" v-model="email">
      </label>
      <label>
        Password:
        <input type="password" v-model="password">
      </label>
      <label>
        Confirm Password:
        <input type="password" v-model="confirmPassword">
      </label>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register.vue",

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    submitForm() {
      // Call a register method in the parent component with the email and password
      this.$emit('register', {
        email: this.email,
        password: this.password
      });
      // Clear the form data
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    }
  }
}
</script>

<style scoped>

</style>
