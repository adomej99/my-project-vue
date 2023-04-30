<template>
  <div>
    <h1 class="page-title">Book Search</h1>
    <button class="books-button" @click="goBack">Back to Book List</button>
    <form class="search-form" @submit.prevent="searchBooks">
      <label class="form-label">
        ISBN Code:
        <input class="form-input" type="text" v-model="isbn" required>
      </label>
      <button class="books-button" type="submit">Search</button>
    </form>
    <ul v-if="books.length > 0" class="book-search-results">
      <li v-for="book in books" :key="book.id" class="book-search-item">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">by {{ book.author }}</p>
        <div class="book-thumbnail">
          <img :src="book.thumbnail">
        </div>
        <p class="book-description">{{ book.description }}</p>
        <button class="books-button books-add-button" @click="addBook(book)">Add Book</button>
      </li>
    </ul>
    <p v-else>No books found.</p>
  </div>
</template>

<script>
import axios from 'axios';
import axiosCustom from '@/config/axios';

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
              isbn: item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier : 'No ISBN available'
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
        isbn: book.isbn
      };
      axiosCustom
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

<style scoped>
.page-title {
  font-size: 32px;
  margin-bottom: 20px;
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

.search-form {
  margin-bottom: 20px;
}

.form-label {
  font-size: 20px;
  margin-right: 10px;
}

.form-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.book-search-results {
  list-style: none;
  margin: 0;
  padding: 0;
}

.book-search-item {
  margin-bottom: 30px;
}

.book-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.book-author {
  font-size: 18px;
  margin-bottom: 10px;
}

.book-thumbnail {
  margin-bottom: 10px;
}

.book-thumbnail img {
  max-width: 200px;
}

.book-description {
  font-size: 16px;
  margin-bottom: 20px;
}

.books-add-button {
  background-color: #1DA1F2;
  margin-left: 10px;
}

.books-add-button:hover {
  background-color: #0E71C8;
}
</style>
