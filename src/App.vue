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
  { pid: 'PID289123456', age: 36, height: 163, weight: 55, disease: 'kanker', intreatmentnow: false  },
  { pid: 'PID111222333', age: 32, height: 170, weight: 60, disease: 'diabetes', intreatmentnow: false  },
  { pid: 'PID444555666', age: 45, height: 180, weight: 85, disease: 'kanker', intreatmentnow: true  },
  { pid: 'PID456289123', age: 41, height: 188, weight: 90, disease: 'ebola', intreatmentnow: false  },
  { pid: 'PID789123456', age: 36, height: 163, weight: 55, disease: 'kanker', intreatmentnow: true  },
  { pid: 'PID777666555', age: 46, height: 168, weight: 65, disease: 'astma', intreatmentnow: false },
  { pid: 'PID555666777', age: 33, height: 173, weight: 68, disease: 'ziekte van Crohn', intreatmentnow: false },
  { pid: 'PID888777666', age: 50, height: 182, weight: 84, disease: 'fibromyalgie', intreatmentnow: true },
  { pid: 'PID666777888', age: 25, height: 175, weight: 70, disease: 'migraine', intreatmentnow: false },
  { pid: 'PID444777111', age: 29, height: 167, weight: 60, disease: 'artrose', intreatmentnow: false },
  { pid: 'PID888666555', age: 39, height: 176, weight: 72, disease: 'reuma', intreatmentnow: true },
  { pid: 'PID333555111', age: 42, height: 170, weight: 75, disease: 'cholera', intreatmentnow: true },
  { pid: 'PID222444888', age: 56, height: 180, weight: 89, disease: 'diabetes type 2', intreatmentnow: false }

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
  height: 100%;
}
</style>
