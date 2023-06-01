<template>
  <SideBar></SideBar>
  <div class="page">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <p class="dashboard-text">{{ user.pid }}</p>
        <p class="dashboard-text">{{ user.age }} jaar</p>
        <p class="dashboard-text">{{ user.height }} cm</p>
        <p class="dashboard-text">{{ user.weight }} kg</p>
        <p class="dashboard-text">Ziekte: {{ user.disease }}</p>
        <p class="dashboard-text">In behandeling: {{ user.intreatmentnow ? 'ja' : 'nee' }}</p>
        <button class="dashboard-back-button" @click="goToUserList">Go Back</button>
      </div>
      <h1 class="week-view-header">Week {{ selectedWeek }} - week gemiddelde</h1>
      <div class="week-view">
        <button class="week-button" @click="selectPreviousWeek">Prev Week</button>
        <button class="week-button" @click="selectNextWeek" v-if="selectedWeek < currentWeek">Next Week</button>
      </div>
      <div class="grid-container-data">
        <StepsCard
          :averageSteps="selectedFitbitWeek.AverageSteps"
          :maxSteps="selectedFitbitWeek.MaxSteps"
          :minSteps="selectedFitbitWeek.MinSteps"
        />
        <CaloriesCard
          :averageCalories="selectedFitbitWeek.AverageCalories"
          :maxCalories="selectedFitbitWeek.MaxCalories"
          :minCalories="selectedFitbitWeek.MinCalories"
        />
        <DistanceTraveldCard
          :averageDistance="selectedFitbitWeek.AverageDistance"
          :maxDistance="selectedFitbitWeek.MaxDistance"
          :minDistance="selectedFitbitWeek.MinDistance"
        />
      </div>

      <div class="grid-container-3">
        <HeartBeatCard
          :averageHeartRateInRest="selectedFitbitWeek.averageHeartRateInRest"
          :maxHeartRateInRest="selectedFitbitWeek.maxHeartRateInRest"
          :minHeartRateInRest="selectedFitbitWeek.minHeartRateInRest"
        />
        <SleepCard
          :averageMinutesAwake="selectedFitbitWeek.AverageMinutesAwake"
          :maxMinutesAwake="selectedFitbitWeek.MaxMinutesAwake"
          :minMinutesAwake="selectedFitbitWeek.MinMinutesAwake"
          :averageMinutesREMSleep="selectedFitbitWeek.AverageMinutesREMSleep"
          :maxMinutesREMSleep="selectedFitbitWeek.MaxMinutesREMSleep"
          :minMinutesREMSleep="selectedFitbitWeek.MinMinutesREMSleep"
          :averageMinutesLightSleep="selectedFitbitWeek.AverageMinutesLightSleep"
          :maxMinutesLightSleep="selectedFitbitWeek.MaxMinutesLightSleep"
          :minMinutesLightSleep="selectedFitbitWeek.MinMinutesLightSleep"
          :averageMinutesDeepSleep="selectedFitbitWeek.AverageMinutesDeepSleep"
          :maxMinutesDeepSleep="selectedFitbitWeek.MaxMinutesDeepSleep"
          :minMinutesDeepSleep="selectedFitbitWeek.MinMinutesDeepSleep"
        />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
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
const currentWeek = 23; // Huidige week
const selectedWeek = ref(currentWeek);

const user = computed(() => {
  const pid = route.params.pid;
  return props.users.find((user) => user.pid === pid);
});

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
  