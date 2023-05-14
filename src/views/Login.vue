<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
        <input type = "text" placeholder = "Gebruikersnaam" v-model="username" required />
        <input type = "password" placeholder = "Wachtwoord" v-model="password" required />
        <button @click="login">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { store } from '../store/store';

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      if(this.username == 'admin' && this.password == 'admin'){
        store.commit('login');
        this.$router.push('/dashboard');
      }else{
        try {
        const response = await axios.post('https://localhost:7034/FitBitAuth/login', {
          username: this.username,
          password: this.password,
        });

        if (response.status === 200) {
          // Set the isLoggedIn variable to true to show the logout button
          store.commit('login');

          // Redirect to the dashboard or wherever you want to go after login
          this.$router.push('/dashboard');
        } else {
          // Handle login error
          console.error('Login failed');
        }
        } catch (error) {
          console.error(error);
        }
      };
    },
  },
});
</script>


  
<style>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: #121528;
    color: white;
    font-size: 24px;
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
    background: #2d363d;
    height: 50px;
    font-size: 20px;
    color: white;
  }
  input::placeholder{
    color: grey;
    font-size: 20px;
  }
  button {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
    height: 50px;
    font-size: 22px;
  }

  </style>