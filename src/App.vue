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
import usersData from "../mockdata.json"

const store = useStore();
const isLoggedIn = ref(store.state.isLoggedIn);
const users = ref(usersData);
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
  min-height: calc(100vh - 64px);
  /* 64px is de hoogte van de AppBar */
}

@media screen and (max-width: 768px) {
  .app-container {
    padding: 1rem;
    /* Verklein de padding van de app-container */
  }
}
</style>
