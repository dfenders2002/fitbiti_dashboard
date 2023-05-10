<template>
    <div class="header">
      <button class="back-button" @click="goToUserList">Go Back</button>
    </div>
    <div class="export">
      <h1>Export Data</h1>
      <p>Select the data to export:</p>
      <ul>
        <li>
          <label>
            <input type="checkbox" v-model="exportOptions.healthData" />
            Medische data
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="exportOptions.customerData" />
            Fitbit data
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" v-model="exportOptions.productData" />
            Blabla data
          </label>
        </li>
      </ul>
      <button @click="exportData">Export</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        exportOptions: {
          healthData: false,
          customerData: false,
          productData: false,
        },
      };
    },
    methods: {
      exportData() {
        // Add logic to export selected data here
        console.log('Exporting data...');
      },
      goToUserList() {
        this.$router.push({ name: 'UserList' });
      },
    },
  };
  </script>
  
  <style>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color:#121528;
    padding: 2rem;
  }
  .export {
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
  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }
  li {
    margin-bottom: 0.5rem;
  }
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  button {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
  }
  .back-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #2d363d;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
}

    
  </style>
  