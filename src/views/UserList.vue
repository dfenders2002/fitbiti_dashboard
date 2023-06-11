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
      <UserCard v-for="user in displayedUsers" :key="user.id" :user="user" @click="goToDashboard(user.id)" />
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
    users.value = data; // Samenvoegen van dummygebruikers en opgehaalde gebruikers
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

async function exportData() {
  try {
    const response = await fetch('https://localhost:7287/fitbit/export');
    const jsonData = await response.json();
    const jsonString = JSON.stringify(jsonData);

    const fileName = getFileNameFromHeaders(response.headers);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  } catch (error) {
    console.error('Fout bij het exporteren van gegevens:', error);
  }
}

function getFileNameFromHeaders(headers) {
  const contentDispositionHeader = headers.get('Content-Disposition');
  if (contentDispositionHeader) {
    const match = contentDispositionHeader.match(/filename="(.+)"/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return 'exported_data.json';
}


function goToDashboard(id: string) {
  router.push({ name: 'Dashboard', params: { id } });
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

const treatmentFilter = ref(['all']); // Standrard filter op 'alle'

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const search = searchTerm.value.toLowerCase();
    var  pidMatch = ''
    var diagnoseMatch = ''
    var treatmentMatch = false
    if(user.pid != null ){
      pidMatch = user.pid.toLowerCase().includes(search);
    }
    if(user.diagnose != null){
      diagnoseMatch = user.diagnose.toLowerCase().includes(search);
    }
    if (treatmentFilter.value.includes('all')) {
      treatmentMatch = true;
    } else if (treatmentFilter.value.includes('inTreatment') && user.inTreatment) {
      treatmentMatch = true;
    } else if (treatmentFilter.value.includes('notInTreatment') && !user.inTreatment) {
      treatmentMatch = true;
    }
    return (pidMatch || diagnoseMatch) && treatmentMatch;
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

.treatment-filter {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.treatment-filter div {
  margin-right: 10px;
  color: white;
  font-size: 20px;
}

.treatment-filter input[type=checkbox] {
  margin-right: 5px;
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