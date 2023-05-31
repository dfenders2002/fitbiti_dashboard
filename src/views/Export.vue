<template>
  <side-bar></side-bar>
  <div class="page">
    <div class="adduser export">
      <h1>Export Data</h1>
      <p>Select the data to export:</p>
      <ul>
        <li>
          <label>
            <span>Medische data</span>
            <input type="checkbox" v-model="exportOptions.healthData" class="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>Fitbit data</span>
            <input type="checkbox" v-model="exportOptions.customerData" class="checkbox" />
          </label>
        </li>
        <li>
          <label>
            <span>Activity data</span>
            <input type="checkbox" v-model="exportOptions.productData" class="checkbox" />
          </label>
        </li>
      </ul>
      <button class="submit" @click="exportData">Export</button>
    </div>
  </div>
</template>



  
<script lang="ts">
import SideBar from '@/components/SideBar.vue';
export default {
  components: { SideBar },
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
  },
};
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

p {
  font-size: 18px;
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
  align-items: center;
  font-size: 22px;
  flex-direction: row;
  justify-content: space-between;
}

label span {
  margin-right: 2rem;
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
  width: 200px;
  font-size: 22px;
}

.export ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.export li {
  margin-bottom: 0.5rem;
}

.export .checkbox {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
}
</style>
