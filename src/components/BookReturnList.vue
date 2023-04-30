<template>
  <div>
    <h2>Returned Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <div class="book-info">
          <img :src="book.thumbnail" class="book-image">
          <div class="book-details">
            <h2 class="book-title">{{ book.title }}</h2>
            <p class="book-author">by {{ book.author }}</p>
            <p>Return request sent by: <router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: book.lendee.id }}"> {{ book.lendee.username }} </router-link></p>
            <div class="book-buttons">
              <button class="accept-button" @click="acceptBook(book)">Accept Return</button>
              <button class="report-button" @click="reportReturn(book)">Report Return</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';
import {router} from "@/router";

export default {
  name: "BookReturnList",

  data() {
    return {
      books: []
    }
  },

  mounted() {
    this.fetchLendedBooks()
  },

  methods: {
    fetchLendedBooks() {
      axios.get('/books/returned')
          .then(response => {
            this.books = response.data;
            console.log(this.books);
          })
          .catch(error => {
            console.log(error);
          });
    },

    acceptBook(book){
      router.push({ name: 'LendeeReviewForm', params: { bookId: book.bookId, userId: book.lendee.id, requestId: book.id} })
    },
    reportReturn(book){
      router.push({ name: 'ReturnReport', params: { userId: book.lendee.id, requestId: book.id, ownerId: book.ownerId} })
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 20px 0;
}

.book-info {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  padding: 20px;
}

.book-image {
  max-width: 100%;
  height: auto;
  margin-right: 20px;
}

.book-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-title {
  margin: 0;
}

.book-author {
  margin: 0 0 10px;
}

.book-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.accept-button {
  background-color: #1DA1F2;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.accept-button:hover {
  background-color: #0d8bf0;
}

.report-button {
  background-color: #FF0000;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
}

.report-button:hover {
  background-color: #FF3333;
}
</style>
