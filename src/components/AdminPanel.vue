<template>
  <div>
    <h1>Admin Panel</h1>
    <div>
      <router-link to="/admin/book_management">Book Management</router-link>
    </div>
    <div>
      <router-link to="/admin/user_management">User Management</router-link>
    </div>
    <div>
      <router-link to="/admin/report-management">Report Management</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: "AdminPanel",

  beforeRouteEnter(to, from, next) {
    axios.get('/user/role').then(response => {
      if (response.data.indexOf('ROLE_ADMIN') !== -1) {
        next()
      } else {
        next('/')
      }
    }).catch(error => {
      console.log(error)
      next('/')
    })
  }
}
</script>

<style scoped>
</style>
