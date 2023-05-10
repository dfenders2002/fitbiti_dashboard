<template>
  <div class="logout">
    <h1>Logout</h1>
    <p>Are you sure you want to logout?</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { store } from '../store/store';

  export default defineComponent({
    emits: ['login'],
    methods: {
      logout() {
        // Clear the isLoggedIn variable in the store to false
        store.commit('logout');

        // Emit the logout event to the parent component
        this.$emit('login', false);

        // Redirect to the login page or wherever you want to go after logout
        this.$router.push('/');
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
    background-color: #121528;
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