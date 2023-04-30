<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Home</a>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <a href="/" class="nav-link" @click.prevent="logout()">Sign Out</a>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/books" class="nav-link">My Books</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/requests/pending" class="nav-link">My Pending Requests</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/books/available" class="nav-link">Available Books</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/books/requests" class="nav-link">Return Requests</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <router-link to="/books/returned" class="nav-link">Return Books</router-link>
        </li>
        <li v-if="isAdmin" class="nav-item">
          <router-link to="/admin/panel" class="nav-link">Admin Panel</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item">
          <button type="button" class="btn btn-link nav-link" @click.prevent="showNotifications = !showNotifications">
            <span class="fa-stack fa-1x">
              <i class="fas fa-bell fa-stack-1x"></i>
              <span class="fa-stack-1x" v-if="notificationCount > 0">
                <i class="fas fa-circle text-danger"></i>
              </span>
            </span>
          </button>
          <div v-if="showNotifications" class="notifications">
            <ul>
              <li v-for="request in expiredRequests" :key="request.id">
                Return period for book {{ request.title }} is about to expire on {{ request.returnDate }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '@/config/axios';

export default {
  name: 'NavigationComponent',

  data() {
    return {
      isLoggedIn: localStorage.getItem('access_token') !== null,
      showNotifications: false,
      expiredRequests: [],
      isAdmin: false,
    }
  },
  computed: {
    notificationCount() {
      return this.expiredRequests.length;
    },
  },

  created() {
    window.addEventListener('storage', this.onStorageChange);

    this.loadUserRole();

    if (this.isLoggedIn) {
      console.log(this.isLoggedIn);
      this.loadExpiredRequests();
    } else {
      this.expiredRequests = [];
    }
  },

  watch: {
    '$route': function() {
      this.isLoggedIn = localStorage.getItem('access_token') !== null;
      // this.loadExpiredRequests();
      console.log("route");
    },
    isLoggedIn(newValue) {
      if (newValue) {
        this.loadUserRole();
        this.loadExpiredRequests();
      } else {
        this.expiredRequests = [];
        this.isAdmin = false;
      }
    },
  },

  methods: {
    logout() {
      // remove token from local storage
      this.isLoggedIn = false;
      this.isAdmin = false;


      localStorage.removeItem('access_token');
      // redirect to login page
      this.expiredRequests = [];
      this.$router.push('/login');
    },
    loadExpiredRequests() {
      axios.get('/requests/expired')
          .then(response => {
            this.expiredRequests = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    onStorageChange(event) {
      // check if access_token item changed
      if (event.key === 'access_token') {
        const newToken = event.newValue;
        if (newToken) {
          // user logged in, load expired requests
          this.loadExpiredRequests();
        } else {
          // user logged out, clear expired requests
          this.expiredRequests = [];
        }
      }
    },
    loadUserRole() {
      axios.get('/user/role')
          .then(response => {
            if (response.data.indexOf('ROLE_ADMIN') !== -1) {
              this.isAdmin = true; // set isAdmin to true if the user has the ROLE_ADMIN role
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
  }
};
</script>


<style>
.notifications {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  padding: 10px;
  min-width: 200px;
  z-index: 10;
}

.notifications ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.notifications li {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.fa-stack {
  position: relative;
}

.fa-stack .fa-circle {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 8px;
}
</style>
