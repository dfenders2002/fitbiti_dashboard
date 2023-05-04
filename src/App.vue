<template>
  <div class="wrapper">
    <SideBar />
    <div class="app-container">
      <router-view :users="users" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideBar from './components/SideBar.vue';

const users = ref([
  { id: 1, name: 'Jahir de Paus', age: 69, height: 160, weight: 69 },
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

.sidebar {
  width: 200px;
  flex-shrink: 0;
}

.app-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  min-height: calc(100vh - 64px); /* 64px is de hoogte van de AppBar */
}
</style>




<style scoped>

/* Media query voor schermen met een maximale breedte van 768px */
@media screen and (max-width: 768px) {
  .app-container {
    padding: 1rem; /* Verklein de padding van de app-container */
  }
}

main {
  background-color:#121528;
  flex-grow: 1;
  padding: 2rem;
}
.dashboard-heading {
  color: white;
  font-size: 32px;
  padding-bottom: 30px;
}
.grid-container-user {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.grid-container-data {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.grid-container-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.app{
  margin-left: 200px;
}
</style>

