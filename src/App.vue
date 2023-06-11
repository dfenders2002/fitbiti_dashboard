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
    users.value = data; 
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
