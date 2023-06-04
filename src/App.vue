<template>
  <div class="wrapper" :isLoggedIn="isLoggedIn">
    <div class="app-container">
      <router-view :users="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SideBar from './components/SideBar.vue';
import { useStore } from './store/store';

const store = useStore();
const isLoggedIn = ref(store.state.isLoggedIn);
const dummyUsers = [
  {id: 1, pid: 'PID123456789', age: 23, heightCm: 175, weightKg: 69, diagnose: 'aids', inTreatment: true },
  {id: 2, pid: 'PID987654321', age: 28, heightCm: 175, weightKg: 62, diagnose: 'kanker', inTreatment: false },
  {id: 3, pid: 'PID456789123', age: 41, heightCm: 188, weightKg: 90, diagnose: 'ebola', inTreatment: false },
  {id: 4, pid: 'PID789123456', age: 36, heightCm: 163, weightKg: 55, diagnose: 'kanker', inTreatment: false },
  {id: 5, pid: 'PID111222333', age: 32, heightCm: 170, weightKg: 60, diagnose: 'diabetes', inTreatment: false },

  // add more users here...
];

const users = ref([]);
const fetchFitbitUsers = async () => {
  try {
    const response = await fetch('https://localhost:7287/fitbit');
    const data = await response.json();
    data.forEach((user) => {
      const birthDate = new Date(user.dateOfBirth); 
      const now = new Date(); 
      const ageDiff = now.getTime() - birthDate.getTime(); 
      const ageDate = new Date(ageDiff); 
      user.age = Math.abs(ageDate.getUTCFullYear() - 1970); 
    });
    users.value = [...dummyUsers, ...data]; 
  } catch (error) {
    console.log('Error fetching Fitbit users:', error);
  }
};



onMounted(() => {
  fetchFitbitUsers();
  const token = localStorage.getItem('token');
  if (token) {
    store.commit('login');
  }
});

</script>




<style scoped>
.wrapper {
  display: flex;
}

.app-container {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  min-height: calc(100vh - 64px); /* 64px is de hoogte van de AppBar */
}

@media screen and (max-width: 768px) {
  .app-container {
    padding: 1rem; /* Verklein de padding van de app-container */
  }
}
</style>
