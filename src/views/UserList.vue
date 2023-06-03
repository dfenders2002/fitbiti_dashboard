<template>
  <side-bar />
  <div class="main">
    <h1 class="user-list-heading">Gebruikerslijst</h1>
    <div class="search-bar">
      <label for="search" class="filter-label">Zoek op pid/diagnose</label>
      <div class="row">
        <input type="text" id="search" class="filter-input" placeholder="Type hier" v-model="searchTerm" />
        <div class="button-container">
          <button class="UserList-button" @click="exportData">
            <span class="sidebar-menu-icon">
              <font-awesome-icon icon="file-export" />
            </span>
            <span class="sidebar-menu-label">Export data</span>
          </button>
          <form @submit.prevent="addFitbit" class="add-fitbit-form">
            <button class="UserList-button">
              <span class="sidebar-menu-icon">
                <font-awesome-icon icon="user-plus" />
              </span>
              <span class="sidebar-menu-label">Add FitBit</span>
            </button>
          </form>
        </div>
      </div>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UserCard from '../components/UserCard.vue';
import SideBar from '@/components/SideBar.vue';
import { saveAs } from 'file-saver';

const router = useRouter();
const dummyUsers = [
  { pid: 'PID123456789', age: 23, heightCm: 175, weightKg: 69, diagnose: 'aids', inTreatment: true },
  { pid: 'PID987654321', age: 28, heightCm: 175, weightKg: 62, diagnose: 'kanker', inTreatment: false },
  { pid: 'PID456789123', age: 41, heightCm: 188, weightKg: 90, diagnose: 'ebola', inTreatment: false },
  { pid: 'PID789123456', age: 36, heightCm: 163, weightKg: 55, diagnose: 'kanker', inTreatment: false },
  { pid: 'PID111222333', age: 32, heightCm: 170, weightKg: 60, diagnose: 'diabetes', inTreatment: false },
];

const users = ref([]);
const realUsers = ref([]);
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
    realUsers.value = data;
    users.value = [...dummyUsers, ...data]; // Samenvoegen van dummygebruikers en opgehaalde gebruikers
  } catch (error) {
    console.log('Error fetching Fitbit users:', error);
  }
};

onMounted(() => {
  fetchFitbitUsers();
});

const searchTerm = ref('');

function addFitbit() {
  window.location.href = 'https://localhost:7287/fitbit/auth';
}

function exportData() {
  // Maak een nieuw array voor de gebruikersdata
  const userData = [];

  // Loop door de echte gebruikers en haal de activiteitsgegevens op
  realUsers.value.forEach(async (user) => {
    try {
      const activityResponse = await fetch(`https://localhost:7287/fitbit/${user.id}/activity`);
      const activityData = await activityResponse.json();
      const sleepResponse = await fetch(`https://localhost:7287/fitbit/${user.id}/sleep`);
      const sleepData = await sleepResponse.json();
      // Voeg de gegevens toe aan het userData array
      userData.push({
        id: user.id,
        pid: user.pid,
        activityData: activityData,
        sleepData: sleepData
      });
      
      // Controleer of alle gebruikers zijn verwerkt
      if (userData.length === realUsers.value.length) {
        // Maak een JSON-string van de userData
        const jsonData = JSON.stringify(userData, null, 2);
        
        // Maak een nieuw Blob-object van de JSON-string
        const blob = new Blob([jsonData], { type: 'application/json' });
        
        // Download het bestand met behulp van de FileSaver.js library
        saveAs(blob, 'user_data.json');
      }
    } catch (error) {
      console.log(`Error fetching activity data for user ${user.id}:`, error);
    }
  });
}

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
    const diagnoseMatch = user.diagnose.toLowerCase().includes(search);
    return pidMatch || diagnoseMatch;
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

.search-bar .row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.UserList-button {
  align-self: flex-start;
  margin: 0;
  margin-left: 3rem;
  width: 200px;
}
.button-container{
  display: flex;
  direction: row;
}

.sidebar-menu-icon{
  margin-right: 1rem;
}


</style>