<template>
    <div class="header">
      <button class="back-button" @click="goToUserList">Go Back</button>
    </div>
    <div class="adduser">
      <h1>Add User</h1>
      <form @submit.prevent="submitForm">
        <label>
          <span>Username:</span>
          <input type="text" v-model="username" />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" v-model="password" />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          debugger;
          const response = await axios.post('https://localhost:7034/FitBitAuth/register', {
            username: this.username,
            password: this.password,
          });
  
          if (response.status === 200) {
            console.log('User added successfully');
            // Redirect to the user list or desired page
          } else {
            console.error('Failed to add user');
          }
        } catch (error) {
          console.error(error);
        }
      },
      goToUserList() {
        this.$router.push({ name: 'UserList' });
      },
    },
  });
  </script>
  
  <style scoped>
  .adduser{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #121528;
    color: white;
  }
  h1 {
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  label span {
    margin-bottom: 0.25rem;
  }
  input[type="text"],
  input[type="password"] {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    margin-left: 0.5rem;
  }
  button[type="submit"] {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
  }
  </style>
  