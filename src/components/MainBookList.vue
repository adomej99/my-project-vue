<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Book List</h1>
      <div class="show-button">
        <router-link :to="{ name: 'BookLendList', params: { isbn: 'noIsbn' } }">
          <button>Show Books With No Isbn Provided</button>
        </router-link>
      </div>
    </div>

    <div v-if="isLoading">
      <content-loader></content-loader>
    </div>

    <ul v-else-if="books.length > 0" class="book-list">
      <li v-for="book in books" :key="book.id" class="book">
        <div class="book-info">
          <div class="thumbnail">
            <template v-if="book.thumbnail.startsWith('http')">
              <img :src="book.thumbnail">
            </template>
            <template v-else>
              <img :src="parseBase64Image(book.thumbnail)">
            </template>
          </div>
          <div class="details">
            <h2>{{ book.title }}</h2>
            <p>by {{ book.author }}</p>
            <div class="show-button">
              <router-link :to="{ name: 'BookLendList', params: { isbn: book.isbn } }">
                <button>Show Available Books</button>
              </router-link>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <p v-else>No books found.</p>
  </div>
</template>

<script>
import axios from '@/config/axios';
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader,
  },
  data() {
    return {
      books: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    getBooks() {
      axios
          .get('/books/available')
          .then(response => {
            this.books = response.data.map(book => ({
              ...book,
            }));
          })
          .catch(error => {
            console.log(error);
            alert('Error fetching book data.');
          })
          .finally(() => {
            this.isLoading = false;
          });
    },
    parseBase64Image(imageData) {
      return `data:image/jpeg;base64,${imageData}`;
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.show-button {
  margin-left: 20px;
}

.book-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.book {
  border: 1px solid #dddfe2;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
}

.book-info {
  display: flex;
}

.thumbnail {
  margin-right: 20px;
}

.thumbnail img {
  height: 193px;
  width: 128px;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.show-button button {
  background-color: #1da1f2;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
}

.show-button button:hover {
  background-color: #0d8bf0;
}

p {
  font-size: 18px;
  margin-top: 20px;
}
</style>
