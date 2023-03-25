<template>
  <div>
    <h2>Lent Books</h2>
    <ul>
      <li v-for="lend in lends" :key="lend.id">
        {{ lend.book.title }} - {{ lend.lendeeName }} - Due: {{ lend.dueDate }}
        <button @click="returnBook(lend)">Return</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LendList",

  props: ['lends'],
  methods: {
    returnBook(lend) {
      // Emit an event to the parent component to return the book
      this.$emit('return-book', lend);
    }
  }
}
</script>

<style scoped>

</style>
