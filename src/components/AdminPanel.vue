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
export default {
  name: "AdminPanel",
}
</script>

<style scoped>
</style>
