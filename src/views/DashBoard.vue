<template>
  <SideBar></SideBar>
  <div class="page">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <p class="dashboard-text">{{ user.pid }}</p>
        <p class="dashboard-text">{{ user.age }} jaar</p>
        <p class="dashboard-text">{{ user.heightCm }} cm</p>
        <p class="dashboard-text">{{ user.weightKg }} kg</p>
        <p class="dashboard-text">Ziekte: {{ user.diagnose }}</p>
        <p class="dashboard-text">In behandeling: {{ user.inTreatment ? 'ja' : 'nee' }}</p>
        <button class="dashboard-back-button" @click="goToUserList">Go Back</button>
      </div>
      <h1 class="week-view-header">Week {{ selectedWeek }} - week gemiddelde</h1>
      <div class="week-view">
        <button class="week-button" @click="selectPreviousWeek">Vorige Week</button>
        <button class="week-button" @click="selectNextWeek" :disabled="selectedWeek >= currentWeek">Volgende Week</button>
      </div>
      <div class="grid-container-data">
        <StepsCard
          :averageSteps="0"
          :maxSteps="0"
          :minSteps="0"
        />
        <CaloriesCard
          :averageCalories="0"
          :maxCalories="0"
          :minCalories="0"
        />
        <DistanceTraveldCard
          :averageDistance="0"
          :maxDistance="0"
          :minDistance="0"
        />
      </div>
      <div class="grid-container-3">
        <HeartBeatCard
          :averageHeartRateInRest="selectedFitbitWeek.averageHeartRateInRest"
          :maxHeartRateInRest="selectedFitbitWeek.maxHeartRateInRest"
          :minHeartRateInRest="selectedFitbitWeek.minHeartRateInRest"
        />
        <SleepCard
          :avgMinutesAwake="769"
          :maxMinutesAwake="125"
          :minMinutesAwake="40"
          :minMinutesAsleep="225"
          :avgMinutesAsleep="410"
          :maxMinutesAsleep="520"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StepsCard from '../components/StepsCard.vue';
import CaloriesCard from '../components/CaloriesCard.vue';
import DistanceTraveldCard from '../components/DistanceTraveledCard.vue'
import HeartBeatCard from '../components/HeartBeatCard.vue';
import SleepCard from '../components/SleepCard.vue';
import SideBar from '../components/SideBar.vue';
import fitbitWeek from '../data/fitbitWeek.json';

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const currentWeek = 23;
const selectedWeek = ref(currentWeek);

const user = computed(() => {
  const id = Number(route.params.id);
  return props.users.find((user) => user.id === id);
});

async function fetchActivityData(id) {
  const response = await fetch(`https://localhost:7287/fitbit/${id}/weekly-activity`, {
    headers: {
      accept: 'text/plain',
    },
  });
  debugger
  if (!response.ok) {
    console.error('Failed fetching activity data');
    return;
  }
  const activityData = await response.json();
}

async function fetchSleepData(id) {
  const response = await fetch(`https://localhost:7287/fitbit/${id}/sleep`, {
    headers: {
      accept: 'text/plain',
    },
  });
  if (!response.ok) {
    console.error('Failed fetching sleep data');
    return;
  }
  const sleepData = await response.json();
}

const selectedFitbitWeek = computed(() => {
  const selectedWeekKey = `week_${selectedWeek.value}`;
  const weekData = fitbitWeek[selectedWeekKey] || {};
  return {
    ...weekData,
    averageHeartRateInRest: weekData.averageHeartRateInRest || 0,
    maxHeartRateInRest: weekData.maxHeartRateInRest || 0,
    minHeartRateInRest: weekData.minHeartRateInRest || 0,
  };
});

watch(selectedWeek, () => {
  const selectedWeekKey = `week_${selectedWeek.value}`;
  const newFitbitWeek = fitbitWeek[selectedWeekKey] || {};
  Object.assign(selectedFitbitWeek, newFitbitWeek);
});

function goToUserList() {
  router.push({ name: 'UserList' });
}

function selectPreviousWeek() {
  if (selectedWeek.value > 1) {
    selectedWeek.value--;
  }
}

function selectNextWeek() {
  if (selectedWeek.value < currentWeek) {
    selectedWeek.value++;
  }
}

onMounted(() => {
  const userId = Number(route.params.id);
  fetchActivityData(userId);
  fetchSleepData(userId);
});

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

.week-view-header {
  text-align: left;
}
.week-view {
  margin-bottom: 10px;
}

.week-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}


.dashboard-header {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.dashboard-text {
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
  margin-right: 20px;
  font-size: 20px;
}

.dashboard-heading {
  font-size: 32px;
}

.dashboard-back-button {
  background-color: #2d363d;
  margin-left: auto;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
}

.week-button{
  background-color: #2d363d;
  margin-right: auto;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
  margin-right: 20px;
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
  