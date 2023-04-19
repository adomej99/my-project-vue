<template>
  <div>
    <h2>Books Available for Lending</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.title }}</h2>
        <p>by {{ book.author }}</p>
        <img :src="book.thumbnail">
        <p>{{ book.description }}</p>
        <p>Owner of the book: {{ book.owner }}</p>
        <button @click="showDatePicker(book)">Request Lend</button>
        <datepicker v-if="showDatepicker" v-model="selectedDate" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';
import Datepicker from "vue3-datepicker";
export default {
  name: "BookLendList",

  components: {
    Datepicker
  },

  data() {
    return {
      books: [],
      showDatepicker: false,
      selectedDate: '',
      selectedBook: null,
    }
  },

  mounted() {
    this.fetchBooks()
  },

  methods: {
    fetchBooks() {
      axios.get('/books/available')
          .then(response => {
            this.books = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    showDatePicker(book) {
      this.showDatepicker = true;
      this.selectedBook = book;
    },

    requestLend(book, selectedDate) {
      console.log(this.selectedBook.id);
      axios
          .post(`/books/available/${book.id}`, { date: selectedDate })
          .then(() => {
            alert('Book request successful!');
            this.showDatepicker = false;
            this.selectedDate = '';
            this.selectedBook = null;
          })
          .catch(error => {
            console.log(error);
            alert('Error requesting book.');
          });
    }
  },

  watch: {
    selectedDate(newVal) {
      if (newVal) {
        this.requestLend(this.selectedBook, newVal);
      }
    }
  }
}
</script>
