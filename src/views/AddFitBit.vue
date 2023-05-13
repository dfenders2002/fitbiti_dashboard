<template>
    <side-bar/>
    <div class = "page">
      <div class="addFitbit">
        <h1>Add Fitbit User</h1>
        <form @submit.prevent="submitForm">
          <label>
            Fitbit ID:
            <input type="text" v-model="fitbitId" />
          </label>
          <button type="submit">Add Fitbit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import SideBar from '@/components/SideBar.vue';
  
  export default defineComponent({
  components: { SideBar },
    data() {
      return {
        fitbitId: '',
      };
    },
    methods: {
      submitForm() {
        // Add logic to submit the form here
        console.log('Adding Fitbit user...');
      },
    },
  });
  </script>
  
  <style scoped>
  .page{
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
  .addFitbit{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 2;
    padding: 2rem;
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
  }
  input[type="text"] {
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
  