<template>
  <div>
    <h1>Book History</h1>
    <h2>{{ bookHistory.title }}</h2>
    <img :src="bookHistory.img">
    <table>
      <thead>
      <tr>
        <th>Date Created</th>
        <th>Action</th>
        <th>Performed By</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="history in bookHistory.history" :key="history.id">
        <td>{{ history.dateCreated }}</td>
        <td>{{ getActionText(history.action) }}</td>
        <td>{{ history.performedBy }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/config/axios';
export default {
  name: "BookHistory",

  data() {
    return {
      book: {},
      bookHistory: [],
    };
  },
  methods: {
    getBookHistory(bookId) {
      // Make API call to get book history by id
      axios.get(`/books/${bookId}/history`)
          .then((response) => {
            this.bookHistory = response.data;
            console.log(this.bookHistory);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getActionText(action) {
      // Map action integer to text
      switch (action) {
        case 1:
          return 'Created';
        case 2:
          return 'Lended';
        default:
          return '';
      }
    },
  },
  mounted() {
    const bookId = this.$route.params.bookId;
    this.getBookHistory(bookId);
  },
};
</script>

