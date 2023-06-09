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
      <div id="scanner-container"></div>
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
import Quagga from 'quagga';
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
  destroy() {
    Quagga.stop();
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
    },
    startBarcodeScanner() {
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream"
        },
        decoder : {
          readers : ["code_128_reader"]
        },
        locate: true,
        numOfWorkers: 4,
        frequency: 10,
        target: '#scanner-container'
      }, function(err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      });
    },
  }
};
</script>

<style scoped>
.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
}

.books-button {
  display: inline-block;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 16px;
  margin-bottom: 24px;
  transition: background-color 0.2s;
}

.books-button:hover {
  background-color: #0e71c8;
}

.search-form {
  display: flex;
  align-items: center;
  margin-bottom: 48px;
}

.form-label {
  font-size: 18px;
  font-weight: bold;
  margin-right: 16px;
  text-align: left;
}

.form-input {
  flex: 1;
  max-width: 400px;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  line-height: 24px;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: #1da1f2;
}

.book-search-results {
  list-style: none;
  margin: 0;
  padding: 0;
}

.book-search-item {
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.book-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.book-author {
  font-size: 18px;
  margin-bottom: 16px;
  color: #555;
}

.book-thumbnail img {
  display: block;
  max-width: 200px;
  height: auto;
  margin-bottom: 16px;
}

.book-description {
  font-size: 18px;
  margin-bottom: 24px;
  color: #333;
}

.books-add-button {
  display: inline-block;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 12px 24px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 16px;
  transition: background-color 0.2s;
}

.books-add-button:hover {
  background-color: #0e71c8;
}

@media (max-width: 768px) {
  .form-label {
    font-size: 16px;
  }

  .form-input {
    font-size: 16px;
    line-height: 20px;
  }

  .book-title {
    font-size: 20px;
  }

  .book-author {
    font-size: 16px;
  }

  .book-description {
    font-size: 16px;
  }

  .books-button,
  .books-add-button {
    font-size: 16px;
    padding: 8px 16px;
    margin-right: 8px;
  }
}

</style>
