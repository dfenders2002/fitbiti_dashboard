<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
          <input type = "text" placeholder = "Gebruikersnaam" v-model="username" required />
          <input type = "password" placeholder = "Wachtwoord" v-model="password" required />
      </form>
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script lang="ts">
  
  import { defineComponent  } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        username: '',
        password: '',
        error: '',
        isLoggedIn: false,
      };
    },
    emits: ['login'],
    methods: {
      async login() {
        try {
          // Replace this with your authentication logic
          if (this.username === 'admin' && this.password === 'admin') {
            // Set the isLoggedIn variable to true to show the logout button
            this.isLoggedIn = true;
            // Emit the login event
            this.$emit('login', this.isLoggedIn);
            // Redirect to the dashboard or wherever you want to go after login
            this.$router.push('/dashboard');
          } else {
            // Handle login error
            console.error('Invalid credentials');
          }
        } catch (error) {
          console.error(error);
        }
    },
    provide() {
      return {
        isLoggedIn: this.isLoggedIn,
      };
    },
  
  }});
  
  </script>
  
  <style>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  h1 {
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-bottom: 0.5rem;
  }
  input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    border: none;
  }
  button {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>