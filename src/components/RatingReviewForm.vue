<template>
  <div class="card">
    <h2>Rate and Review Book</h2>
    <form @submit.prevent="submitForm">
      <div class="rating-section">
        <label for="bookRating">Rate the book:</label>
        <div class="rating-container">
          <button type="button" class="star" :class="{ 'star-filled': bookRating >= 1 }" @click="bookRating = 1">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': bookRating >= 2 }" @click="bookRating = 2">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': bookRating >= 3 }" @click="bookRating = 3">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': bookRating >= 4 }" @click="bookRating = 4">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': bookRating >= 5 }" @click="bookRating = 5">
            <i class="fas fa-star"></i>
          </button>
        </div>
      </div>
      <div>
        <label for="bookReview">Write a review for the book:</label>
        <textarea v-model="bookReview" id="bookReview" name="bookReview"></textarea>
      </div>
      <div class="rating-section">
        <label for="lenderRating">Rate the lender:</label>
        <div class="rating-container">
          <button type="button" class="star" :class="{ 'star-filled': lenderRating >= 1 }" @click="lenderRating = 1">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': lenderRating >= 2 }" @click="lenderRating = 2">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': lenderRating >= 3 }" @click="lenderRating = 3">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': lenderRating >= 4 }" @click="lenderRating = 4">
            <i class="fas fa-star"></i>
          </button>
          <button type="button" class="star" :class="{ 'star-filled': lenderRating >= 5 }" @click="lenderRating = 5">
            <i class="fas fa-star"></i>
          </button>
        </div>
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
          .post(`/books/lent/${this.bookId}/return`, {
            bookRating: this.bookRating,
            bookReview: this.bookReview,
            lenderRating: this.lenderRating,
            lenderReview: this.lenderReview,
          })
          .then(() => {
            alert('Rating and review submitted!');
            this.$router.push('/lent');
          })
          .catch(error => {
            console.log(error);
            alert('Error submitting rating and review.');
          });
    },
  },
};
</script>

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
}

.card h2 {
  margin-top: 0;
}

.rating-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.star {
  display: inline-block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0 5px;
  font-size: 20px;
  color: #ccc;
}

.star-filled {
  color: #ffd700;
}

textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
}

button[type="submit"] {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0E71C8;
}
</style>

