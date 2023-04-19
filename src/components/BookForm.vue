<template>
  <div>
    <h2>Add Book</h2>
    <form @submit.prevent="handleSubmit">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="book.title" required>

      <label for="author">Author:</label>
      <input type="text" id="author" v-model="book.author" required>

      <label for="publicationDate">Publication Date:</label>
      <input type="date" id="publicationDate" v-model="book.publicationDate" required>

      <label for="isbn">ISBN:</label>
      <input type="text" id="isbn" v-model="book.isbn" required>

      <!-- Add any other relevant book information fields here -->

      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookForm",
  data() {
    return {
      book: {
        title: '',
        author: '',
        publicationDate: '',
        isbn: '',
        // Add any other relevant book information fields here
      }
    }
  },
  methods: {
    handleSubmit() {
      // Call your Symfony backend API here to add the book to the database
      // You can use Axios or another HTTP client library to make API requests
      axios.post('/api/books', this.book)
          .then(response => {
            // Handle success case here, such as showing a success message
            console.log(response.data);
          })
          .catch(error => {
            // Handle error case here, such as showing an error message
            console.log(error.response.data);
          });
    }
  }
}
</script>

<style scoped>

</style>
