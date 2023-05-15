<template>
  <side-bar />
  <div class="main">
    <h1 class="user-list-heading">Gebruikerslijst</h1>
    <div class="search-bar">
      <label for="search" class="filter-label">Zoek op pid / ziekte</label>
      <input type="text" id="search" class="filter-input" placeholder="Type hier" v-model="searchTerm">
    </div>
    <div class="grid-container-users" :style="{ 'grid-template-columns': gridColumns }">
      <UserCard v-for="user in filteredUsers" :key="user.pid" :user="user" @click="goToDashboard(user.pid)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserCard from '../components/UserCard.vue';
import fitbitMockdata from '../../fitbit_Mockdata.json';

const router = useRouter();
const search = ref('');
const selectedDisease = ref('');
const users = ref(fitbitMockdata);


const searchTerm = ref('');

function goToDashboard(pid: string) {
  router.push({ name: 'Dashboard', params: { pid } });
}

const userCount = computed(() => {
  return users.value.length;
});

const gridColumns = computed(() => {
  const columns = Math.ceil(Math.sqrt(userCount.value));
  return `repeat(${columns}, 1fr)`;
});


const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const search = searchTerm.value.toLowerCase();
    const pidMatch = user.pid.toLowerCase().includes(search);
    const diseaseMatch = user.disease.toLowerCase().includes(search);
    return pidMatch || diseaseMatch;
  });
});
</script>

<style scoped>
.main {
  background-color: #121528;
  flex-grow: 1;
  padding: 2rem;
}

.user-list-heading {
  color: white;
  font-size: 32px;
  padding-bottom: 30px;
}

.search-bar {
  font-size: 26px;
  display: flex;
  flex-direction: column;
}

.filter-label {
  color: white;
  margin-right: 0.5rem;
}

.filter-input {
  background: #2d363d;
  height: 50px;
  padding-left: 10px;
  width: 500px;
  margin-bottom: 50px;
  color: white;
  font-size: 20px;
}

.filter-input::placeholder {
  color: grey;
  font-size: 20px;
}

.grid-container-users {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>