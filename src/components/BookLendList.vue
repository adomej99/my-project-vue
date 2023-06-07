<template>
  <div>
    <h2 class="section-title">Books Available for Lending</h2>
    <ul class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <div class="book-header">
          <div class="book-info">
            <h2 class="book-title">{{ book.title }}</h2>
            <p class="book-author">by {{ book.author }}</p>
          </div>
          <div class="book-actions">
            <button class="btn-show-reviews" @click="showReviews[book.id] = !showReviews[book.id]">Show Reviews</button>
            <button class="btn-request-lend" @click="showDatePicker(book)">Request Lend</button>
            <datepicker v-if="showDatepicker" v-model="selectedDate" />
          </div>
        </div>
        <div class="book-body">
          <div class="book-thumbnail">
            <template v-if="book.thumbnail.startsWith('http')">
              <img :src="book.thumbnail" :alt="book.title" />
            </template>
            <template v-else>
              <img :src="parseBase64Image(book.thumbnail)" :alt="book.title" />
            </template>
          </div>
          <div class="book-details">
            <div class="user-rating">
              <div class="user-info">
                <p class="book-rating">Book rating: </p>
                <StarRating :rating="book.rating" />
              </div>
            </div>
            <div class="user-rating">
              <div class="user-info">
                <p class="owner-title">Owner of the book:</p>
                <p class="owner-name"><router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: book.owner.id }}"> {{ book.owner.username }} </router-link></p>
                <StarRating :rating="book.owner.rating" />
              </div>
            </div>
            <p class="book-description">{{ book.description }}</p>
            <div v-if="showReviews[book.id]">
              <div v-if="book.reviews.length > 0">
                <h3 class="review-title">Reviews:</h3>
                <ul class="review-list">
                  <li v-for="review in book.reviews" :key="review.review" class="review-item">
                    <div class="review-header">
                      <p class="reviewer-name">{{ review.reviewedBy }}</p>
                      <div class="review-rating">
                        <StarRating :rating="review.rating" />
                      </div>
                    </div>
                    <p class="review-text">{{ review.review }}</p>
                  </li>
                </ul>
              </div>
              <div v-else>
                <p class="no-review-text">No reviews yet.</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';
import Datepicker from "vue3-datepicker";
import StarRating from '@/components/NewStarRating.vue'


export default {
  name: "BookLendList",

  components: {
    Datepicker,
    StarRating,
  },

  data() {
    return {
      books: [],
      showDatepicker: false,
      selectedDate: '',
      selectedBook: null,
      showReviews: {},
    }
  },

  mounted() {
    const isbn = this.$route.params.isbn;
    this.fetchBooks(isbn)
  },

  methods: {
    fetchBooks(isbn) {
      axios.get(`/books/available_isbn/${isbn}`)
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    getPhotoUrl(book) {
      axios
          .get(`/books/${book.id}/image`)
          .then(response => {
            // Assuming the response contains the photo URL
            const photoUrl = response.data.photoUrl;
            // Update the book object with the photo URL
            book.thumbnail = photoUrl;
          })
          .catch(error => {
            console.error(error);
            // Handle error
          });
    },

    parseBase64Image(imageData) {
      return `data:image/jpeg;base64,${imageData}`;
    },

    showDatePicker(book) {
      this.showDatepicker = true;
      this.selectedBook = book;
    },

    requestLend(book, selectedDate) {
      console.log(this.selectedBook.id);
      axios
          .post(`/books/available/${book.id}`, { date: selectedDate })
          .then(() => {
            alert('Book request successful!');
            this.showDatepicker = false;
            this.selectedDate = '';
            this.selectedBook = null;
          })
          .catch(error => {
            console.log(error);
            alert('Error requesting book.');
          });
    }
  },

  watch: {
    selectedDate(newVal) {
      if (newVal) {
        this.requestLend(this.selectedBook, newVal);
      }
    },
    books: {
      immediate: true,
      handler(newBooks) {
        newBooks.forEach(book => {
          if (!book.thumbnail.startsWith('http')) {
            this.getPhotoUrl(book);
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.book-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.book-item {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0.1);
}

.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.book-title {
  margin: 0;
  font-size: 20px;
}

.book-author {
  margin: 0;
  font-size: 14px;
}

.book-thumbnail img {
  max-width: 100%;
  height: auto;
}

.book-details {
  padding: 10px;
}

.book-rating {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.owner-title {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.owner-name {
  margin: 0;
  font-size: 14px;
}

.review-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
}

.review-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.review-item {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.reviewer-name {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.review-rating {
  display: inline-block;
  margin-left: 10px;
}

.review-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.btn-show-reviews,
.btn-request-lend {
  background-color: transparent;
  border: none;
  color: #1DA1F2;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.btn-show-reviews:hover,
.btn-request-lend:hover {
  text-decoration: underline;
}

.no-review-text {
  margin: 0;
  font-size: 14px;
  font-style: italic;
}

</style>

