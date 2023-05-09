<template>
    <div class="logout">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from 'vue';
  
    export default defineComponent({
        data(){
            return {
                isLoggedIn: true,
            }
        },
      emits: ['login'],
      methods: {
        logout() {
          // Add your logout logic here
          // For example:
          //localStorage.removeItem('authToken');

          this.isLoggedIn = false;

          // Emit the logout event to the parent component
          this.$emit('login', this.isLoggedIn);
          // Redirect to the login page or wherever you want to go after logout
          this.$router.push('/');
          console.log(this.isLoggedIn)
        },
      },
    });
  </script>
  
  <style>
  .logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  h1 {
    margin-bottom: 1rem;
  }
  button {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
  }
  </style>