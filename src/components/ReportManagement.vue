<template>
  <div>
    <h2>Report Management</h2>
    <ul>
      <li v-for="report in reports" :key="report.returnedById">
        <p>Reported by: <router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: report.userId }}">{{ report.user }}</router-link></p>
        <p>Reported user: <router-link target="_blank" :to="{ name: 'UserInfo', params: { userId: report.returnedById }}">{{ report.returnedBy }}</router-link></p>
        <p>Issue: {{ report.report }}</p>
        <p>Report Date: {{ report.date }}</p>
        <button @click="acceptReport(report.reportId)">Accept Report</button>
        <button @click="declineReport(report.reportId)">Decline Report</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: "ReportManagement",

  data() {
    return {
      reports: [],
    }
  },

  mounted() {
    this.fetchReports();
  },

  methods: {
    fetchReports() {
      axios.get('/reports')
          .then(response => {
            this.reports = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },

    acceptReport(reportId) {
      axios.patch(`/reports/${reportId}/accept`)
          .then(() => {
            alert('User status updated successfully!');
            this.fetchReports();
          })
          .catch(error => {
            console.log(error);
            alert('Error updating user status.');
          });
    },

    declineReport(reportId) {
      axios.patch(`/reports/${reportId}/decline`)
          .then(() => {
            alert('User status updated successfully!');
            this.fetchReports();
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
