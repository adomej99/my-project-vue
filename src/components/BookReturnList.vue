<template>
  <div>
    <h2>Returned Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.title }}</h2>
        <img :src="book.thumbnail">
        <p>by {{ book.author }}</p>
        <p>Return request sent by: {{ book.lendee.username }}</p>
        <button @click="acceptBook(book)">Accept Return</button>
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

    // acceptBook(book) {
    //   axios
    //       .post(`/books/returned/${book.id}/accept`)
    //       .then(() => {
    //         alert('Book returned successfully!');
    //         this.books = this.books.filter(b => b.id !== book.id);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         alert('Error returning book.');
    //       });
    // }
    acceptBook(book){
      router.push({ name: 'LendeeReviewForm', params: { bookId: book.bookId, userId: book.lendee.id, requestId: book.id} })
    }
  }
}
</script>
