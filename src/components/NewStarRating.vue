<template>
  <div>
    <span v-for="i in 5" :key="i" :class="[i <= rating ? 'fa fa-star' : 'fa fa-star empty']"></span>
  </div>
</template>

<script>

import "@fortawesome/fontawesome-free/css/all.css";

export default {
  props: {
    rating: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.star-rating {
  color: gold;
}
.empty {
  color: gray;
}
</style>
