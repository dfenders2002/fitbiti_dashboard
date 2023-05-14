<template>
  <main>
    <h1 class="user-list-heading">Fitbithouders</h1>
    <div class="filters">
      <h2 class="filters-heading">Filters</h2>
      <div class="filter-item">
        <label for="search" class="filter-label">Zoek:</label>
        <input type="text" id="search" class="filter-input" v-model="search" placeholder="Zoek op naam">
      </div>
      <div class="filter-item">
        <label for="disease" class="filter-label">Ziekte:</label>
        <select id="disease" class="filter-select" v-model="selectedDisease">
          <option>Geen</option>
          <option>COVID-19</option>
          <option>Griep</option>
          <option>Diabetes</option>
          <option>Kanker</option>
          <option>Hart- en vaatziekten</option>
        </select>
      </div>
    </div>
    <div class="grid-container-users">
      <UserCard v-for="user in filteredList" :key="user.id" :user="user" @click="goToDashboard(user.id)" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UserCard from '../components/UserCard.vue'

const router = useRouter();
const search = ref('');
const selectedDisease = ref('');
const users = ref([
  { id: 1, name: 'George Junior', age: 23, height: 175, weight: 69, disease: 'COVID-19' },
  { id: 2, name: 'Emma Johnson', age: 28, height: 175, weight: 62, disease: 'Griep' },
  { id: 3, name: 'Liam Brown', age: 41, height: 188, weight: 90, disease: 'Diabetes' },
  { id: 4, name: 'Ava Davis', age: 36, height: 163, weight: 55, disease: 'Kanker' },
  { id: 5, name: 'Jahir Estupinan', age: 27, height: 181, weight: 80, disease: 'Hart- en vaatziekten' }
  // add more users here...
]);

const filteredList = computed(() => {
  return users.value.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(search.value.toLowerCase());
    const diseaseMatch = !selectedDisease.value || user.disease === selectedDisease.value;
    return nameMatch && diseaseMatch;
  });
});

function goToDashboard(id: number) {
  router.push(`/dashboard/${id}`);
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

.filters {
  margin: auto;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.filters-heading {
  display: flex;
  align-items: center;
  color: white;
  font-size: 22px;
  margin-right: 5rem;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-right: 5rem;
  font-size: 22px;
}

.filter-label {
  margin: auto;
  color: white;
  margin-right: 0.5rem;
}

.filter-input {
  margin: auto;
  background: white;
  height: 32px;
  padding-left: 12px;
}

.filter-select {
  padding: 0.5rem;
  height: 32px;
  border-radius: 4px;
  border: none;
  outline: none;
}

.grid-container-users {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>