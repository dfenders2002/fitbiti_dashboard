
<template>
  <main>
    <h1 class="user-list-heading">Gebruikerslijst</h1>
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
  { id: 1, name: 'Jahir Epstein', age: 69, height: 175, weight: 69 },
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
  background-color:#121528;
  flex-grow: 1;
  padding: 2rem;
}

.user-list-heading {
  color: white;
  font-size: 32px;
  padding-bottom: 30px;
}

.grid-container-users {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
</style>