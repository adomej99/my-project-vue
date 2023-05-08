<template>
  <div>
    <h2>User Management</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        <p>{{ user.username }}</p>
        <button @click="showReports(user.id)">Show Reports</button>
        <button @click="toggleUserStatus(user.id)">{{ user.active ? 'Disable' : 'Activate' }} User</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: "UserManagement",

  data() {
    return {
      users: [],
    }
  },

  mounted() {
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      axios.get('/users')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    showReports(userId) {
      // Navigate to the ReportManagement page with the userId as a parameter
      this.$router.push({ path: '/admin/report_management', query: { userId: userId } });
    },

    toggleUserStatus(userId) {
      axios.post(`/users/${userId}/toggle-status`)
          .then(() => {
            alert('User status updated successfully!');
            this.fetchUsers();
          })
          .catch(error => {
            console.log(error);
            alert('Error updating user status.');
          });
    },
  },
}
</script>

<style scoped>
</style>
