<template>
  <div>
    <h1>Add Book</h1>
    <button @click="goBack">Back to Book List</button>
    <form @submit.prevent="addBook">
      <label>
        Title:
        <input type="text" v-model="title" required>
      </label>
      <label>
        Author:
        <input type="text" v-model="author" required>
      </label>
      <label>
        Description:
        <textarea v-model="description"></textarea>
      </label>
      <label>
        Thumbnail:
        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*">
      </label>
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>
<script>
import axios from '@/config/axios';
import { router } from "@/router";

export default {
  name: "ManualBookAdd",
  data() {
    return {
      title: '',
      author: '',
      description: '',
      thumbnail: null,
      thumbnailB64: null,
      session: '',
    };
  },
  mounted() {
    const session = localStorage.getItem('session');

    if (session) {
      this.session = JSON.parse(session);
    }
  },
  methods: {
    handleFileUpload() {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnailB64 = e.target.result;
      };
      reader.readAsDataURL(this.$refs.fileInput.files[0]);
      this.thumbnail = this.$refs.fileInput.files[0];
    },
    addBook() {
      const data = new FormData();
      data.append('title', this.title);
      data.append('author', this.author);
      data.append('thumbnail', this.thumbnailB64);
      data.append('description', this.description);
      data.append('image', this.thumbnail);

      axios
          .post('/books/add_book_manual', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            alert('Book added successfully!');
          })
          .catch(error => {
            console.log(error);
            alert('Error adding book.');
          });
    },

    goBack() {
      router.push({ name: 'BookList' })
    }
  }
};
</script>
