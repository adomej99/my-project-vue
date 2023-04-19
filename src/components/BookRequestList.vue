<template>
  <div>
    <h2>Book Requests</h2>
    <ul>
      <li v-for="request in requests" :key="request.id">
        <h2>{{ request.book.title }}</h2>
        <p>by {{ request.book.author }}</p>
        <img :src="request.book.thumbnail">
        <p>{{ request.book.description }}</p>
        <p>Requested by {{ request.requestedBy }}</p>
        <p>Requested date: {{ request.requestDate }}</p>
        <p>Return date: {{ request.returnDate }}</p>
        <button @click="acceptRequest(request)">Accept Request</button>
        <button @click="declineRequest(request)">Decline Request</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: 'BookRequestsList',

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
      axios.get('/books/requests')
          .then(response => {
            this.requests = response.data;
            console.log(this.requests.book);
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book requests.');
          });
    },

    acceptRequest(request) {
      axios.post(`/books/requests/${request.id}/accept`)
          .then(() => {
            alert('Request accepted!');
            this.fetchRequests();
          })
          .catch(error => {
            console.log(error);
            alert('Error accepting request.');
          });
    },

    declineRequest(request) {
      axios.post(`/books/requests/${request.id}/decline`)
          .then(() => {
            alert('Request declined.');
            this.fetchRequests();
          })
          .catch(error => {
            console.log(error);
            alert('Error declining request.');
          });
    },
  },
};
</script>
