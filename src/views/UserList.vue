<template>
  <main>
    <h1 class="user-list-heading">Gebruikerslijst</h1>
    <div class="filters">
      <h2 class="filters-heading">Filters</h2>
      <div class="filter-item">
        <label for="search" class="filter-label">Zoek:</label>
        <input type="text" id="search" class="filter-input" placeholder="Typ hier iets om te zoeken">
      </div>
      <div class="filter-item">
        <label for="disease" class="filter-label">Ziekte:</label>
        <select id="disease" class="filter-select">
          <option disabled selected>Kies een ziekte</option>
          <option>COVID-19</option>
          <option>Griep</option>
          <option>Diabetes</option>
          <option>Kanker</option>
          <option>Hart- en vaatziekten</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="disease-filter" class="filter-label">Alleen zieke gebruikers:</label>
        <input type="checkbox" id="disease-filter" class="filter-checkbox">
      </div>
    </div>
    <div class="grid-container-users">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @click="goToDashboard(user.id)"
      />
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserCard from '../components/UserCard.vue'

const router = useRouter();
const users = ref([
  { id: 1, name: 'George Junior', age: 23, height: 175, weight: 69 },
  { id: 2, name: 'Emma Johnson', age: 28, height: 175, weight: 62 },
  { id: 3, name: 'Liam Brown', age: 41, height: 188, weight: 90 },
  { id: 4, name: 'Ava Davis', age: 36, height: 163, weight: 55 },
  // add more users here...
]);

function goToDashboard(userId: number) {
  router.push({ name: 'Dashboard', params: { userId } });
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
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.filters-heading {
  color: white;
  font-size: 24px;
  margin-right: 5rem;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-right: 5rem;
  font-size: 22px;
}

.filter-label {
  color: white;
  margin-right: 0.5rem;
}

.filter-input{
  background: white;
  height: 22px;
  padding-left: 10px;
}
.filter-select {
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  outline: none;
}

.filter-checkbox {
  height: 22px;
  width: 18px;
}

.grid-container-users {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>