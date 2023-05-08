<template>
  <div class="card">
    <div class="header">
      <h2>Rate lendee</h2>
    </div>
    <form class="form" @submit.prevent="submitForm">
      <div class="rating-section">
        <label for="lenderRating">Select rating:</label>
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
      <div class="form-group">
        <label for="lenderReview">Write a review for lendee:</label>
        <textarea v-model="lenderReview" id="lenderReview" name="lenderReview"></textarea>
      </div>
      <button type="submit" class="submit-button">Submit</button>
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

<style>
.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
}

.card h2 {
  margin-top: 0;
  font-size: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

form select,
form textarea {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 1rem;
}

form select:focus,
form textarea:focus {
  outline: none;
  border: 2px solid #1DA1F2;
}

form button[type="submit"] {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
}

form button[type="submit"]:hover {
  background-color: #0E71C8;
}

textarea {
  background-color: #DCDCDC;
}
</style>
