<template>
  <div>
    <h1>Bad Return Report</h1>
    <form @submit.prevent="submitReport">
      <div>
        <label for="description">Description of the Issue:</label>
        <textarea id="description" v-model="report" required></textarea>
      </div>
      <button type="submit">Submit Report</button>
    </form>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  data() {
    return {
      reportedPerson : "",
      requestId : "",
      reportedBy : "",
      report : ""
    }
  },
  methods: {
    submitReport() {
      const data = {
        reportedPerson: this.$route.params.userId,
        requestId: this.$route.params.requestId,
        reportedBy: this.$route.params.ownerId,
        report: this.report
      };

      axios.post("/users/report", data)
          .then(response => {
            // Handle success
            console.log(response);
            this.reportedPerson = "";
            this.requestId = "";
            this.reportedBy = "";
            this.description = "";
          })
          .catch(error => {
            // Handle error
            console.log(error);
            alert("Error submitting report.");
          });
    }
  }
}
</script>
