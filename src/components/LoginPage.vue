<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card mt-5">
          <div class="card-body">
            <h1 class="card-title text-center mb-4">Login</h1>
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" class="form-control" v-model="username" required />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" class="form-control" v-model="password" required />
              </div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('access_token', response.data.token);

        this.$router.push('/');
        // Redirect to a protected route or perform any other action
      } catch (error) {
        this.error = "Invalid credentials";
      }
    },
  },
}
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  font-size: 2rem;
}

.btn-primary {
  background-color: #1DA1F2;
  border-color: #1DA1F2;
}

.btn-primary:hover {
  background-color: #0E71C8;
  border-color: #0E71C8;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
}
</style>
