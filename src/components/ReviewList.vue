<template>
  <div>
    <h2>Reviews</h2>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <p>Rating: {{ review.rating }}</p>
        <p>Text: {{ review.text }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ReviewList",

  props: ['reviews']
}
</script>

<style scoped>

</style>
