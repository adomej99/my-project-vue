<template>
  <div class="container">
    <div class="header">
      <h2 class="title">My Lent Books</h2>
      <button class="books-button" @click="goBack">Back to Book List</button>
    </div>
    <ul class="book-list">
      <li v-for="request in requests" :key="request.id">
        <div class="book-info">
          <div class="thumbnail">
            <img :src="request.book.thumbnail">
          </div>
          <div class="details">
            <h2>{{ request.book.title }}</h2>
            <p class="author">{{ request.book.author }}</p>
            <p class="description">{{ request.book.description }}</p>
            <div class="user-rating">
              <p class="username">Requested by: <router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: request.requestedBy.id }}"> {{ request.requestedBy.username }} </router-link></p>
              <StarRating :rating="request.requestedBy.rating" />
            </div>
            <p class="date">Requested date: {{ request.requestDate }}</p>
            <p class="date">Return date: {{ request.returnDate }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import axios from '@/config/axios';
import StarRating from '@/components/NewStarRating.vue'
import {router} from "@/router";
export default {
  name: "MyLendedBooks",

  components: {
    StarRating,
  },

  data() {
    return {
      requests: [],
    };
  },

  mounted() {
    this.fetchRequests();
  },

  methods: {
    fetchRequests() {
      axios.get('/books/my_lent')
          .then(response => {
            this.requests = response.data;
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book requests.');
          });
    },
    goBack(){
      router.push({ name: 'BookList' })
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #fff;
  border: 1px solid #dddfe2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}

.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin: 0;
}

.books-button {
  background-color: #1da1f2;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
}

.books-button:hover {
  background-color: #0d8bf0;
}

.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.book-list li {
  border-bottom: 1px solid #dddfe2;
  margin-bottom: 20px;
  padding-bottom: 20px;
}

.book-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.thumbnail {
  margin-right: 20px;
  flex-shrink: 0;
}

.thumbnail img {
  width: 150px;
  height: 200px;
}

.details {
  display: flex;
  flex-direction: column;
}

.author {
  color: #5b7083;
  font-size: 16px;
  margin-top: 10px;
}

.description {
  font-size: 14px;
  margin-top: 10px;
}

.user-rating {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.username {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.date {
  color: #5b7083;
  font-size: 14px;
  margin-top: 10px;
}
</style>
