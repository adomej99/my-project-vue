<template>
  <div>
    <h1>Add Book</h1>
    <button @click="goBack" class="books-button">Back to Book List</button>
    <form @submit.prevent="addBook" class="book-form">
      <div class="book-form-group">
        <label>
          ISBN:
          <input type="text" v-model="isbn" required class="book-input">
        </label>
      </div>
      <div class="book-form-group">
        <label>
          Title:
          <input type="text" v-model="title" required class="book-input">
        </label>
      </div>
      <div class="book-form-group">
        <label>
          Author:
          <input type="text" v-model="author" required class="book-input">
        </label>
      </div>
      <div class="book-form-group">
        <label>
          Description:
          <textarea v-model="description" class="book-textarea"></textarea>
        </label>
      </div>
      <div class="book-form-group">
        <label>
          Thumbnail:
          <div class="thumbnail-preview" v-if="previewImage">
            <img :src="previewImage" alt="Thumbnail Preview">
          </div>
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*">
        </label>
      </div>
      <button type="submit" class="books-button">Add Book</button>
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
      isbn: '',
      title: '',
      author: '',
      description: '',
      thumbnail: null,
      thumbnailB64: null,
      session: '',
      previewImage: null,
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
        this.previewImage = e.target.result;
        this.thumbnailB64 = e.target.result;
      };
      reader.readAsDataURL(this.$refs.fileInput.files[0]);
      this.thumbnail = this.$refs.fileInput.files[0];
    },
    addBook() {
      const data = new FormData();
      data.append('isbn', this.isbn);
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

<style>
.book-input,
.book-textarea {
  background-color: #E8E8E8;
  border: none;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  border-radius: 5px;
}

.book-textarea {
  height: 200px;
}

.thumbnail-preview {
  margin-bottom: 10px;
}

.thumbnail-preview img {
  max-width: 200px;
  max-height: 200px;
}

.book-form-group {
  margin-bottom: 20px;
}

.books-button {
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
}

.books-button:hover {
  background-color: #0E71C8;
}

</style>
