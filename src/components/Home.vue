<template>
  <div>
    <h2>Home</h2>
    <router-link to="/books">View Books</router-link>
    <router-link to="/lend">Lend a Book</router-link>
    <router-link to="/borrow">Borrow a Book</router-link>
    <router-link to="/reviews">View Reviews</router-link>
    <router-link to="/messages">Messages</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>


<style scoped>

</style>
