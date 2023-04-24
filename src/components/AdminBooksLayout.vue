<template>
  <div>
    <h1>All Books</h1>
    <div v-if="isLoading">
      <content-loader></content-loader>
    </div>
    <ul v-else-if="books.length > 0">
      <li v-for="book in books" :key="book.id">
        <h2>{{ book.title }}</h2>
        <p>by {{ book.author }}</p>
        <img :src="book.thumbnail">
        <p>{{ book.description }}</p>
        <p>Owner of the book: <router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: book.owner.id }}"> {{ book.owner.username }} </router-link></p>
        <div>
          <router-link :to="{ name: 'BookHistory', params: { bookId: book.id } }">
            <button>Show History</button>
          </router-link>
          <button @click="removeBook(book)">Remove Book</button>
          <select v-model="book.status" @change="updateBook(book)">
            <option :value="false">Unavailable</option>
            <option :value="true">Available</option>
          </select>
        </div>
      </li>
    </ul>
    <p v-else>No books found.</p>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";

export default {
  extends: BookList,
  // Add any additional component options or overrides here
};
</script>
