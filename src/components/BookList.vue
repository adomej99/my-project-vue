<template>
  <div>
    <button @click="search">Search for Books</button>
    <h1>My Books</h1>
    <div v-if="isLoading">
      <content-loader></content-loader>
    </div>
    <ul v-else-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.title }}</h2>
        <p>by {{ book.author }}</p>
        <template v-if="book.thumbnail.startsWith('http')">
          <img :src="book.thumbnail">
        </template>
        <template v-else>
          <img :src="parseBase64Image(book.thumbnail)">
        </template>
        <p>{{ book.description }}</p>
        <div>
          <router-link :to="{ name: 'BookHistory', params: { bookId: book.id } }">
            <button>Show History</button>
          </router-link>
          <button @click="removeBook(book)">Remove Book</button>
          <select v-model="book.status" @change="updateBook(book)">
            <option :value="false">Unavailable</option>
            <option :value="true">Available</option>
          </select>
          <button @click="showRequests(book)">Requests</button>
        </div>
      </li>
    </ul>
    <p v-else>No books found.</p>
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
      apiUrl: process.env.VUE_APP_API_URL
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      axios
          .get('/books')
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
    showHistory(book) {
      alert(`History for book ${book.title}`);
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
    showRequests(book) {
      // TODO: Implement popup window to display requests for this book
      alert(`Requests for book ${book.title}`);
    },
    search() {
      router.push({ name: 'AddBook' })
    }
  }
};
</script>

<style>
li img {
  width: 128px;
  height: 193px;
}
</style>
