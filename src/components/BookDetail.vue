<template>
  <div>
    <h2>{{ book.title }}</h2>
    <div>Author: {{ book.author }}</div>
    <div>Publication Date: {{ book.publicationDate }}</div>
    <div>ISBN: {{ book.isbn }}</div>
    <div>Genre: {{ book.genre }}</div>
    <div>Language: {{ book.language }}</div>
    <div>Description: {{ book.description }}</div>
    <div>Rating: {{ book.rating }}</div>
    <button @click="editBook">Edit</button>
  </div>
</template>

<script>
export default {
  name: "BookDetail",

  props: ['book'],
  methods: {
    editBook() {
      // Emit an event to the parent component to display the edit form
      this.$emit('edit-book', this.book);
    }
  }
}
</script>

<style scoped>

</style>
