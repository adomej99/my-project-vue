<template>
  <div class="navigation">
    <router-link v-if=session to="/">Home</router-link>
    <router-link v-if=!session to="/login">Login</router-link>
    <router-link v-if=session @click="logout" to="">Logout</router-link>
    <router-link v-if=!session to="/register">Register</router-link>
    <router-link v-if=session to="/books">Books</router-link>
    <router-link v-if=session to="/lend">Lend</router-link>
    <router-link v-if=session to="/borrow">Borrow</router-link>
    <router-link v-if=session to="/reviews">Reviews</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',

  data() {
    return {
      session: null,
    }
  },
  mounted() {
    const session = localStorage.getItem('token');
    if (session) {
      this.session = JSON.parse(session);
    }
  },
  methods: {
    logout(){
      localStorage.setItem('session', null);
      this.$router.push('/');
      this.$forceUpdate();
    }
  }
}
</script>

<style>
.navigation {
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 10px;
}

.navigation a {
  color: #fff;
  margin: 0 10px;
  text-decoration: none;
  font-size: 18px;
}
</style>
