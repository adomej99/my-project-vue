<template>
  <div>
    <h2>Rate and Review Book</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="lenderRating">Rate the lender:</label>
        <select v-model="lenderRating" id="lenderRating" name="lenderRating">
          <option value="1">1 star</option>
          <option value="2">2 stars</option>
          <option value="3">3 stars</option>
          <option value="4">4 stars</option>
          <option value="5">5 stars</option>
        </select>
      </div>
      <div>
        <label for="lenderReview">Write a review for the lender:</label>
        <textarea v-model="lenderReview" id="lenderReview" name="lenderReview"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from '@/config/axios';

export default {
  name: 'RatingReviewForm',

  props: {
    bookId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      bookRating: '',
      bookReview: '',
      lenderRating: '',
      lenderReview: '',
    };
  },

  methods: {
    submitForm() {
      axios
          .post(`/books/lent/${this.bookId}/${this.$route.params.userId}/${this.$route.params.requestId}/accept`, {
            lenderRating: this.lenderRating,
            lenderReview: this.lenderReview,
          })
          .then(() => {
            alert('Rating and review submitted!');
            this.$router.push('/books/returned');
          })
          .catch(error => {
            console.log(error);
            alert('Error submitting rating and review.');
          });
    },
  },
};
</script>
