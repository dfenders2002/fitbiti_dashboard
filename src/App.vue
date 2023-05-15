<template>
  <div class="wrapper" :isLoggedIn="isLoggedIn">
    <div class="app-container">
      <router-view :users="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideBar from './components/SideBar.vue';
import { useStore } from './store/store';

const store = useStore();
const isLoggedIn = ref(store.state.isLoggedIn);
const users = ref([
  { pid: 'PID123456789', age: 23, height: 175, weight: 69, disease: 'aids', intreatmentnow: true  },
  { pid: 'PID987654321', age: 28, height: 175, weight: 62, disease: 'kanker', intreatmentnow: false  },
  { pid: 'PID456789123', age: 41, height: 188, weight: 90, disease: 'ebola', intreatmentnow: false  },
  { pid: 'PID789123456', age: 36, height: 163, weight: 55, disease: 'kanker', intreatmentnow: false  },
  { pid: 'PID111222333', age: 32, height: 170, weight: 60, disease: 'diabetes', intreatmentnow: false  },
  { pid: 'PID444555666', age: 45, height: 180, weight: 85, disease: 'kanker', intreatmentnow: true  },
  { pid: 'PID456789123', age: 41, height: 188, weight: 90, disease: 'ebola', intreatmentnow: false  },
  { pid: 'PID789123456', age: 36, height: 163, weight: 55, disease: 'kanker', intreatmentnow: true  },
  // add more users here...
]);
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
