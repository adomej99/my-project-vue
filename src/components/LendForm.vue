<template>
  <div>
    <h2>Lend Book</h2>
    <form @submit.prevent="submitForm">
      <label>
        Lend to:
        <input type="text" v-model="lendeeName">
      </label>
      <label>
        Due Date:
        <input type="date" v-model="dueDate">
      </label>
      <button type="submit">Lend</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LendForm",

  data() {
    return {
      lendeeName: '',
      dueDate: ''
    }
  },
  methods: {
    submitForm() {
      // Emit an event to the parent component to lend the book
      this.$emit('lend-book', {
        lendeeName: this.lendeeName,
        dueDate: this.dueDate
      });
      // Clear the form data
      this.lendeeName = '';
      this.dueDate = '';
    }
  }
}
</script>

<style scoped>

</style>
