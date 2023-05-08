<template>
  <div class="book-requests">
    <h2>Book Requests</h2>
    <ul class="requests-list">
      <li v-for="request in requests" :key="request.id" class="request-item">
        <div class="book-details">
          <h2>{{ request.book.title }}</h2>
          <p>by {{ request.book.author }}</p>
          <img :src="request.book.thumbnail">
          <p>{{ request.book.description }}</p>
        </div>
        <div class="requester-details">
          <p>Requested by:</p>
          <p class="username"><router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: request.requestedBy.id }}"> {{ request.requestedBy.username }} </router-link></p>
          <StarRating :rating="request.requestedBy.rating" />
          <a :href="'tel:+' + request.requestedBy.phone">Call me {{ request.requestedBy.phone }}</a>
        </div>
        <div class="dates-details">
          <p>Requested date: {{ request.requestDate }}</p>
          <p>Return date: {{ request.returnDate }}</p>
        </div>
        <div class="request-actions">
          <button @click="acceptRequest(request)">Accept Request</button>
          <button @click="declineRequest(request)">Decline Request</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';
import StarRating from '@/components/NewStarRating.vue'


export default {
  name: 'BookRequestsList',

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
      axios.get('/books/requests')
          .then(response => {
            this.requests = response.data;
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book requests.');
          });
    },

    acceptRequest(request) {
      if (confirm(`Are you sure you want to accept request?`)) {
        axios.post(`/books/requests/${request.id}/accept`)
            .then(() => {
              alert('Request accepted!');
              this.fetchRequests();
            })
            .catch(error => {
              console.log(error);
              alert('Error accepting request.');
            });
      }
    },

    declineRequest(request) {
      if (confirm(`Are you sure you want to cancel request?`)) {
        axios.post(`/books/requests/${request.id}/decline`)
            .then(() => {
              alert('Request declined.');
              this.fetchRequests();
            })
            .catch(error => {
              console.log(error);
              alert('Error declining request.');
            });
      }
    }
  },
};
</script>

<style scoped>
.book-requests {
  display: grid;
  gap: 2rem;
  padding: 2rem;
  background-color: #f5f8fa;
}

.requests-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.request-item {
  background-color: white;
  border: 1px solid #e6ecf0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #e6ecf0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 1rem;
  padding: 1.5rem;
}

.book-details {
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
}

.book-details h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.book-details img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #e6ecf0;
  margin-bottom: 1rem;
}

.requester-details {
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.requester-details p {
  margin: 0;
}

.requester-details .username {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.requester-details a {
  text-decoration: none;
  color: #1da1f2;
}

.dates-details {
  grid-column: 1 / span 1;
  grid-row: 3 / span 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dates-details p {
  margin: 0;
}

.request-actions {
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.request-actions button {
  background-color: white;
  border: 1px solid #1da1f2;
  border-radius: 5px;
  color: #1da1f2;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

.request-actions button:hover {
  background-color: #e6f5ff;
}

.request-actions button:first-child {
  background-color: #1da1f2;
  color: white;
  margin-bottom: 1rem;
}

.request-actions button:first-child:hover {
  background-color: #0c8af5;
}
</style>
