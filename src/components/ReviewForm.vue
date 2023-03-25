<template>
  <div>
    <h2>Add a Review</h2>
    <form @submit.prevent="submitForm">
      <label>
        Rating:
        <select v-model="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label>
        Review:
        <textarea v-model="text"></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ReviewForm",

  data() {
    return {
      rating: 1,
      text: ''
    }
  },
  methods: {
    submitForm() {
      // Emit an event to the parent component to add the review
      this.$emit('add-review', {
        rating: this.rating,
        text: this.text
      });
      // Clear the form data
      this.rating = 1;
      this.text = '';
    }
  }
}
</script>

<style scoped>

</style>
