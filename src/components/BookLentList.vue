<template>
  <div class="container">
    <div class="header">
      <h2>Books I'm Currently Borrowing</h2>
    </div>
    <div class="content">
      <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-item">
          <div class="book-details">
            <h3 class="book-title">{{ book.title }}</h3>
            <div class="book-thumbnail">
              <img :src="book.thumbnail">
            </div>
            <p class="book-author">by {{ book.author }}</p>
            <p class="book-owner">Owner: {{ book.owner }}</p>
          </div>
          <div class="book-actions">
            <button class="return-button" @click="returnBook(book)">Send Return Request</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/config/axios';
import {router} from "@/router";

export default {
  name: "BookLentList",

  data() {
    return {
      books: [],
      selectedBookId: null,
    }
  },

  mounted() {
    this.fetchLendedBooks()
  },

  methods: {
    fetchLendedBooks() {
      axios.get('/books/lent')
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    returnBook(book){
      router.push({ name: 'RatingReviewForm', params: { bookId: book.id } })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}

.content {
  padding: 20px 0;
}

.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.book-item {
  display: flex;
  align-items: flex-start;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}

.book-details {
  flex-grow: 1;
}

.book-thumbnail img {
  max-width: 100%;
}

.book-title {
  margin-top: 0;
}

.book-owner {
  margin-bottom: 0;
  font-size: 14px;
}

.book-actions {
  margin-left: 20px;
}

.return-button {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.return-button:hover {
  background-color: #0E71C8;
}
</style>
