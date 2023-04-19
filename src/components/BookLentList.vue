<template>
  <div>
    <h2>Lended Books</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.title }}</h2>
        <img :src="book.thumbnail">
        <p>by {{ book.author }}</p>
        <p>Owner of the book: {{ book.owner }}</p>
        <button @click="returnBook(book)">Return Book</button>
      </li>
    </ul>
<!--    <RatingReviewForm-->
<!--        v-if="selectedBookId"-->
<!--        :bookId="selectedBookId"-->
<!--        @close="selectedBookId = null"-->
<!--    />-->
  </div>
</template>

<script>
import axios from '@/config/axios';
import {router} from "@/router";

export default {
  name: "BookLentList",

  // components: {
  //   RatingReviewForm,
  // },

  data() {
    return {
      books: [],
      selectedBookId: null,
    }
  },

  mounted() {
    this.fetchLendedBooks()
  },

  methods: {
    fetchLendedBooks() {
      axios.get('/books/lent')
          .then(response => {
            this.books = response.data;
            console.log(this.books);
          })
          .catch(error => {
            console.log(error);
          });
    },

    // returnBook(book) {
    //   axios
    //       .post(`/books/lent/${book.id}/return`)
    //       .then(() => {
    //         alert('Book returned successfully!');
    //         this.books = this.books.filter(b => b.id !== book.id);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //         alert('Error returning book.');
    //       });
    // },
    returnBook(book){
      router.push({ name: 'RatingReviewForm', params: { bookId: book.id } })
    }
  }
}
</script>
