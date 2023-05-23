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
const users = ref([
  { pid: 'PID123456789', name: 'George Junior', age: 23, height: 175, weight: 69, disease: 'aids' },
  { pid: 'PID987654321', name: 'Emma Johnson', age: 28, height: 175, weight: 62, disease: 'kanker' },
  { pid: 'PID456789123', name: 'Liam Brown', age: 41, height: 188, weight: 90, disease: 'ebola' },
  { pid: 'PID789123456', name: 'Ava Davis', age: 36, height: 163, weight: 55, disease: 'tifus' },
  { pid: 'PID111222333', name: 'Sophia Smith', age: 32, height: 170, weight: 60, disease: 'diabetes' },
  { pid: 'PID444555666', name: 'Noah Wilson', age: 45, height: 180, weight: 85, disease: 'hypertensie' },
  { pid: 'PID777888999', name: 'Olivia Taylor', age: 19, height: 160, weight: 50, disease: 'astma' },
  // add more users here...
]);

onMounted(() => {
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
