<template>
  <div class="register-page">
    <h2 class="register-page__title">Register</h2>
    <form class="register-page__form" @submit.prevent="registerUser()">
      <label class="register-page__label">
        Email:
        <input class="register-page__input" type="email" v-model="email">
      </label>
      <label class="register-page__label">
        Username:
        <input class="register-page__input" type="text" v-model="username">
      </label>
      <label class="register-page__label">
        Password:
        <input class="register-page__input" type="password" v-model="password">
      </label>
      <label class="register-page__label">
        Repeat Password:
        <input class="register-page__input" type="password" v-model="repeatPassword">
      </label>
      <label class="register-page__label">
        Phone Number:
        <input class="register-page__input" type="tel" v-model="phoneNumber">
      </label>
      <label class="register-page__label">
        Region:
        <input class="register-page__input" type="text" v-model="region">
      </label>
      <label class="register-page__label">
        City:
        <input class="register-page__input" type="text" v-model="city">
      </label>
      <label class="register-page__label">
        Other Contacts:
        <textarea class="register-page__textarea" v-model="otherContacts"></textarea>
      </label>
      <button class="register-page__button" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from '@/config/axios';

export default {
  name: "RegisterPage",

  data() {
    return {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
      region: "",
      city: "",
      otherContacts: "",
    };
  },

  methods: {
    registerUser() {
      axios.post('/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        repeat_password: this.repeatPassword,
        phone_number: this.phoneNumber,
        region: this.region,
        city: this.city,
        other_contacts: this.otherContacts,
      })
          .then(response => {
            console.log(response.data.message);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>

<style>
/* Global styles */
body {
  font-family: 'Helvetica Neue', sans-serif;
  background-color: #f5f8fa;
}

/* Register page styles */
.register-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.register-page__title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1da1f2;
}

.register-page__form {
  display: flex;
  flex-direction: column;
}

.register-page__label {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1da1f2;
}

.register-page__input,
.register-page__textarea {
  border: none;
  background-color: #f5f8fa;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.register-page__input:focus,
.register-page__textarea:focus {
  outline: none;
  background-color: #e8f5fe;
}

.register-page__button {
  background-color: #1da1f2;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  cursor: pointer;
}

.register-page__button:hover {
  background-color: #0c8cc7;
}
</style>
