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
  { id: 1, name: 'George Junior', age: 23, height: 175, weight: 69 },
  { id: 2, name: 'Emma Johnson', age: 28, height: 175, weight: 62 },
  { id: 3, name: 'Liam Brown', age: 41, height: 188, weight: 90 },
  { id: 4, name: 'Ava Davis', age: 36, height: 163, weight: 55 },
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
