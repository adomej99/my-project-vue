<template>
  <div>
    <h2>My Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <div>{{ book.title }} by {{ book.author }} ({{ book.publicationDate }})</div>
        <button @click="viewBookDetails(book)">View Details</button>
        <button @click="lendBook(book)">Lend Book</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BookList",

  data() {
    return {
      books: []
    }
  },
  mounted() {
    // Call your Symfony backend API here to get the list of user's books
    // You can use Axios or another HTTP client library to make API requests
    axios.get('/api/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.log(error.response.data);
        });
  },
  methods: {
    viewBookDetails(book) {
      // Emit an event to the parent component to display the book details
      this.$emit('view-book-details', book);
    },
    lendBook(book) {
      // Emit an event to the parent component to display the lend form
      this.$emit('lend-book', book);
    }
  }
}
</script>

<style scoped>

</style>
