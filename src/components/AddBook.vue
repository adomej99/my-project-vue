<template>
  <div>
    <h1>Book Search</h1>
    <button @click="goBack">Back to Book List</button>
    <form @submit.prevent="searchBooks">
      <label>
        ISBN Code:
        <input type="text" v-model="isbn" required>
      </label>
      <button type="submit">Search</button>
    </form>
    <ul v-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.title }}</h2>
        <p>by {{ book.author }}</p>
        <img :src="book.thumbnail">
        <p>{{ book.description }}</p>
        <button @click="addBook(book)">Add Book</button>
      </li>
    </ul>
    <p v-else>No books found.</p>
  </div>
</template>

<script>
import axios from '@/config/axios';
import {router} from "@/router";

export default {
  data() {
    return {
      isbn: '',
      session: '',
      books: []
    };
  },
  mounted() {
    const session = localStorage.getItem('session');

    if (session) {
      this.session = JSON.parse(session);
    }
  },
  methods: {
    searchBooks() {
      axios
          .get('https://www.googleapis.com/books/v1/volumes', {
            params: {
              q: `isbn:${this.isbn}`
            }
          })
          .then(response => {
            this.books = response.data.items.map(item => ({
              id: item.id,
              title: item.volumeInfo.title,
              author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
              thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Image',
              description: item.volumeInfo.description ? item.volumeInfo.description : 'No description available.',
            }));
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book data.');
          });
    },
    addBook(book) {
      const data = {
        title: book.title,
        author: book.author,
        thumbnail: book.thumbnail,
        description: book.description,
        userId: this.session.user_id
      };
      axios
          .post('/books/add_book', data)
          .then(() => {
            alert('Book added successfully!');
          })
          .catch(error => {
            console.log(error);
            alert('Error adding book.');
          });
    },
    goBack(){
      router.push({ name: 'BookList' })
    }
  }
};
</script>
