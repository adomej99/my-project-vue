<template>
  <div>
    <div>
      <button class="books-button" @click="search">Search for Books</button>
      <button class="books-button" @click="add">Add Book Manually</button>
      <button class="books-button" @click="lent">Show My Lent Books</button>
    </div>
    <h1>My Books</h1>
    <div v-if="isLoading">
      <content-loader></content-loader>
    </div>
    <ul v-else-if="books.length > 0" class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <div class="book-header">
          <h2 class="book-title">{{ book.title }}</h2>
          <p class="book-author">{{ book.author }}</p>
          <div class="book-actions">
            <router-link :to="{ name: 'BookHistory', params: { bookId: book.id } }">
              <button class="books-button">Show History</button>
            </router-link>
            <button class="books-button" @click="removeBook(book)">Remove Book</button>
            <button class="books-button" :class="book.status ? 'books-unavailable' : 'books-available'" @click="updateBook(book)">
              {{ book.status ? 'Make Book Unavailable' : 'Make Book Available' }}
            </button>
          </div>
        </div>
        <div class="book-body">
          <div class="book-thumbnail">
            <img :src="book.thumbnail" alt="book-thumbnail">
          </div>
          <div class="book-details">
            <p class="book-description">{{ book.description }}</p>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>No books found.</p>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import axios from '@/config/axios';
import { ContentLoader } from 'vue-content-loader'
import {router} from "@/router";

export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      books: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      axios
          .get(`/books/`)
          .then(response => {
            this.books = response.data.map(book => ({
              ...book,
              status: book.status !== false,
            }));
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book data.');
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
    parseBase64Image(imageData) {
      return `data:image/jpeg;base64,${imageData}`;
    },
    removeBook(book) {
      if (confirm(`Are you sure you want to remove ${book.title}?`)) {
        axios
            .post(`/books/${book.id}`)
            .then(() => {
              this.books = this.books.filter(b => b.id !== book.id);
              alert('Book removed successfully!');
            })
            .catch(error => {
              console.log(error);
              alert('Error removing book.');
            });
      }
    },
    updateBook(book) {
      axios
          .put(`/books/${book.id}`, book)
          .then(() => {
            alert('Book updated successfully!');
          })
          .catch(error => {
            console.log(error);
            alert('Error updating book.');
          });
    },
    search() {
      router.push({ name: 'AddBook' })
    },
    add() {
      router.push({ name: 'ManualBookAdd' })
    },
    lent() {
      router.push({ name: 'MyLendedBooks' })
    }
  }
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-unavailable {
  background-color: red;
  color: white;
}

.btn-available {
  background-color: blue;
  color: white;
}

.books-button {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.books-button:hover {
  background-color: #0E71C8;
}

.books-remove {
  background-color: #ff5757;
  margin-right: 0;
}

.books-available {
  background-color: #1DA1F2;
}

.books-unavailable {
  background-color: #ff5757;
}

.button-container button {
  padding: 10px 20px;
  background-color: #1DA1F2;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #0e7ad4;
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

.books-button {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.books-button:hover {
  background-color: #0E71C8;
}

.book-rating {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.books-button.books-unavailable {
  background-color: #FF0000;
}

.books-button.books-available {
  background-color: #1DA1F2;
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

.error-message {
  color: red;
  margin-top: 20px;
}

select {
  font-size: 16px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #555;
  box-shadow: 0 2px 2px rgba(0,0,0,0.1);
}

select:focus {
  outline: none;
  border-color: #1DA1F2;
  box-shadow: 0 2px 2px rgba(0,0,0,0.1), 0 0 0 2px rgba(29,161,242,0.5);
}

option {
  background-color: #fff;
  color: #555;
}

.status-selector {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 18px;
}

.status-selector span {
  margin-right: 10px;
}

.status-selector button {
  background-color: #1DA1F2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-selector button:hover {
  background-color: #0d8bd2;
}

.status-selector button.active {
  background-color: #00b300;
}

.status-selector button.active:hover {
  background-color: #008000;
}


</style>

