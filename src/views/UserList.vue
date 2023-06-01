<template>
  <side-bar/>
  <div class="main">
    <h1 class="user-list-heading">Gebruikerslijst</h1>
    <div class="search-bar">
      <label for="search" class="filter-label">Zoek op pid/ziekte</label>
      <input type="text" id="search" class="filter-input" placeholder="Type hier" v-model="searchTerm" />
    </div>
    <div class="grid-container-users" :style="{ 'grid-template-columns': gridColumns }">
      <UserCard v-for="user in displayedUsers" :key="user.pid" :user="user" @click="goToDashboard(user.pid)" />
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" class="pagination-button" @click="previousPage">Vorige</button>
      <span>{{ currentPage }} van {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" class="pagination-button" @click="nextPage">Volgende</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserCard from '../components/UserCard.vue';
import SideBar from '@/components/SideBar.vue';

const router = useRouter();
const users = ref([
  { pid: 'PID123456789', age: 23, height: 175, weight: 69, disease: 'aids', intreatmentnow: true  },
  { pid: 'PID987654321', age: 28, height: 175, weight: 62, disease: 'kanker', intreatmentnow: false  },
  { pid: 'PID456789123', age: 41, height: 188, weight: 90, disease: 'ebola', intreatmentnow: false  },
  { pid: 'PID789123456', age: 36, height: 163, weight: 55, disease: 'kanker', intreatmentnow: false  },
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
  // voeg hier meer gebruikers toe...
]);

const searchTerm = ref('');

function goToDashboard(pid: string) {
  router.push({ name: 'Dashboard', params: { pid } });
}

const userCount = computed(() => {
  return users.value.length;
});

const PAGE_SIZE = 9;
const currentPage = ref(1);
const totalPages = computed(() => {
  const filteredUsersLength = filteredUsers.value.length;
  if (filteredUsersLength === 0) {
    return 1;
  } else {
    return Math.ceil(filteredUsersLength / PAGE_SIZE);
  }
});


const gridColumns = computed(() => {
  const columns = Math.ceil(Math.sqrt(PAGE_SIZE));
  return `repeat(${columns}, 1fr)`;
});

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const search = searchTerm.value.toLowerCase();
    const pidMatch = user.pid.toLowerCase().includes(search);
    const diseaseMatch = user.disease.toLowerCase().includes(search);
    return pidMatch || diseaseMatch;
  });
});

const displayedUsers = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return filteredUsers.value.slice(start, end);
});

function nextPage() {
  currentPage.value++;
}

function previousPage() {
  currentPage.value--;
}
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

.filter-input{
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
  max-height: 80%;
  overflow-y: auto;
  grid-gap: 20px;
}

.pagination span {
  color: #fff;
  font-size: 18px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  background-color: #2d363d;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
  margin-top: 0px;
}

.pagination button:disabled {
  background-color: #2d363d;
  opacity: 0.5;
  color: #ccc;
  cursor: not-allowed;
}

</style>