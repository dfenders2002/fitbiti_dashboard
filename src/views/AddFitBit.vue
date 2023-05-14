<template>
  <side-bar></side-bar>
  <div class="page">
    <div class="adduser addFitbit">
      <h1>Add Fitbit User</h1>
      <form @submit.prevent="submitForm">
        <label>
          Fitbit ID:
          <input class="textfield" type="text" v-model="fitbitId" placeholder="Type hier" />
        </label>
        <button class="submit" type="submit">Add Fitbit</button>
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
.page {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
.adduser {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex-grow: 2;
  padding: 2rem;
  padding-top: 10rem;
    background-color: #121528;
    color: white;
}

.textfield {
    background: #2d363d;
    height: 50px;
    padding-left: 10px;
    width: 500px;
    color: white;
    font-size: 20px;
    border: 2px solid #2d363d;
}

.textfield::placeholder {
    color: grey;
    font-size: 20px;
}

h1 {
    margin-bottom: 1rem;
}

form {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
}

label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 22px;
}

label span {
    margin-bottom: 0.25rem;
}

.submit {
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
