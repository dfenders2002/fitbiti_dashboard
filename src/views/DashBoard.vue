<template>
  <SideBar></SideBar>
  <div class="page">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-heading">{{ user.pid }}</h1>
        <p class="dashboard-text">{{ user.age }} jaar</p>
        <p class="dashboard-text">{{ user.height }} cm</p>
        <p class="dashboard-text">{{ user.weight }} kg</p>
        <p class="dashboard-text">Ziekte: {{ user.disease }}</p>
        <p class="dashboard-text">In behandeling: {{ user.intreatmentnow ? 'ja' : 'nee' }}</p>
        <button class="dashboard-back-button" @click="goToUserList">Go Back</button>
      </div>
      <div class="grid-container-data">
        <StepsCard />
        <CaloriesCard />
        <DistanceTraveledCard />
      </div>
      <div class="grid-container-3">
        <HeartBeatCard />
        <SleepCard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import StepsCard from '../components/StepsCard.vue';
import CaloriesCard from '../components/CaloriesCard.vue';
import DistanceTraveledCard from '../components/DistanceTraveledCard.vue';
import HeartBeatCard from '../components/HeartBeatCard.vue';
import SleepCard from '../components/SleepCard.vue';
import SideBar from '../components/SideBar.vue';

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();

const user = computed(() => {
  const pid = route.params.pid;
  return props.users.find((user) => user.pid === pid);
});

function goToUserList() {
  router.push({ name: 'UserList' });
}
</script>
  
<style scoped>
.page {
  background-color: #121528;
  flex-grow: 1;
}

.dashboard-container {
  background-color: #121528;
  flex-grow: 1;
  padding: 2rem;
  color: white;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-right: 20px;
}

.dashboard-text {
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
}

.dashboard-heading {
  font-size: 32px;
}

.dashboard-back-button {
  background-color: #2d363d;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
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
</style>
  