<!-- StarRating.vue -->
<template>
  <span :class="starClasses"></span>
</template>

<script>

import "@fortawesome/fontawesome-free/css/all.css";

export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
    maxRating: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    starClasses() {
      const fullStars = Math.floor(3);
      const emptyStars = this.maxRating - fullStars;
      const classes = [];
      for (let i = 0; i < fullStars; i++) {
        classes.push("fa fa-star");
      }
      for (let i = 0; i < emptyStars; i++) {
        classes.push("fa fa-star empty");
      }
      return "star-rating " + classes.join(" ");
    },
  },
};
</script>

<style scoped>
.star-rating {
  display: inline-block;
  font-size: 1.2rem;
  color: #ffc107;
  line-height: 1;
  margin: 0;
  padding: 0;
}
.star-rating i {
  display: inline-block;
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0;
  padding: 0;
}
.star-rating i:before {
  content: "\f005";
  font-family: "Font Awesome 5 Free",serif;
  font-weight: 900;
  font-style: normal;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: inherit;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
}
.star-rating .empty:before {
  content: "\f006";
}
</style>
