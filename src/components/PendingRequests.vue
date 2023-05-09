<template>
  <div>
    <h2>My pending requests</h2>
    <ul>
      <li v-for="request in requests" :key="request.id">
        <h2>{{ request.book.title }}</h2>
        <p>by {{ request.book.author }}</p>
        <img :src="request.book.thumbnail">
        <p>{{ request.book.description }}</p>
        <div class="user-rating">
          <div class="user-info">
            <p>Book Owner: <router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: request.owner.id }}"> {{ request.owner.username }} </router-link></p>
            <StarRating :rating="request.owner.rating" />
          </div>
        </div>
        <a :href="'tel:+' + request.owner.phone">Call owner {{ request.owner.phone }}</a>
        <p>Requested date: {{ request.requestDate }}</p>
        <p>Return date: {{ request.returnDate }}</p>
        <button class="books-button" @click="cancelRequest(request.id)">Cancel request</button>
      </li>
    </ul>
  </div>
</template>

<script>

import axios from '@/config/axios';
import StarRating from '@/components/NewStarRating.vue'
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
      axios.get('/requests/pending')
          .then(response => {
            this.requests = response.data;
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book requests.');
          });
    },
    cancelRequest(id) {
      if (confirm(`Are you sure you want to cancel request?`)) {
        axios
            .post(`/request/pending/cancel/${id}`)
            .then(() => {
              this.requests = this.requests.filter(b => b.id !== id);
              alert('Requests canceled successfully!');
            })
            .catch(error => {
              console.log(error);
              alert('Error canceling request.');
            });
      }
    },
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
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  background-color: #fff;
}

h2 {
  margin: 0 0 10px;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.user-rating {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.user-info {
  display: flex;
  align-items: center;
}

p {
  margin: 0 0 10px;
}

button {
  background-color: #FF0000;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #0d8bf0;
}
</style>
