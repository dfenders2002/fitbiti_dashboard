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
      <h1 class="week-view-header">Week {{ selectedWeek }} - {{ startDate }} - {{ endDate }}</h1>
      <div class="week-view">
        <button class="week-button" @click="selectPreviousWeek">Vorige Week</button>
        <button class="week-button" @click="selectNextWeek" :disabled="selectedWeek >= currentWeek - 1">Volgende Week</button>
      </div>
      <div class="grid-container-data">
        <StepsCard
          :averageSteps="selectedWeekData ? Math.round(selectedWeekData.avgSteps) : 0"
          :maxSteps="selectedWeekData ? selectedWeekData.maxSteps : 0"
          :minSteps="selectedWeekData ? selectedWeekData.minFSteps : 0"
        />

        <CaloriesCard
          :averageCalories="selectedWeekData ? Math.round(selectedWeekData.avgActivityCalories) : 0"
          :maxCalories="selectedWeekData ? selectedWeekData.maxActivityCalories : 0"
          :minCalories="selectedWeekData ? selectedWeekData.minActivityCalories : 0"
        />
        <FloorsClimbedCard
          :averageFloors="selectedWeekData ?  Math.round(selectedWeekData.avgFloors) : 0"
          :maxFloors="selectedWeekData ? selectedWeekData.maxFloors : 0"
          :minFloors="selectedWeekData ? selectedWeekData.minFloors : 0"
        />
      </div>
      <div class="grid-container-3">
        <HeartBeatCard
          :averageHeartRateInRest="selectedWeekData ? Math.round(selectedWeekData.avgRestingHeartRate) : 0"
          :maxHeartRateInRest="selectedWeekData ? selectedWeekData.maxRestingHeartRate : 0"
          :minHeartRateInRest="selectedWeekData ? selectedWeekData.minRestingHeartRate : 0"
        />
        <SleepCard
          :avgMinutesAwake="selectedSleepData ? Math.round(selectedSleepData.avgMinutesAwake) : 0"
          :maxMinutesAwake="selectedSleepData ? selectedSleepData.maxMinutesAwake : 0"
          :minMinutesAwake="selectedSleepData ? selectedSleepData.minMinutesAwake : 0"
          :minMinutesAsleep="selectedSleepData ? selectedSleepData.minMinutesAsleep : 0"
          :avgMinutesAsleep="selectedSleepData ? Math.round(selectedSleepData.avgMinutesAsleep) : 0"
          :maxMinutesAsleep="selectedSleepData ? selectedSleepData.maxMinutesAsleep : 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import StepsCard from '../components/StepsCard.vue';
import CaloriesCard from '../components/CaloriesCard.vue';
import FloorsClimbedCard from '../components/FloorsClimbedCard .vue'
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
const activityData = ref([]);
const sleepData = ref([]);

const currentDate = new Date();
const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
const pastDaysOfYear = (currentDate - firstDayOfYear) / 86400000;
const currentWeek = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);

const selectedWeek = ref(currentWeek - 1);

const user = computed(() => {
  const id = Number(route.params.id);
  return props.users.find((user) => user.id === id);
});

async function fetchActivityData(id) {
  const response = await fetch(`https://localhost:7287/fitbit/${id}/weekly-activity`, {
    headers: {
      accept: 'application/json',
    },
  });
  if (!response.ok) {
    console.error('Failed fetching activity data');
    return;
  }
  activityData.value = await response.json();
}

async function fetchSleepData(id, weekNumber) {
  const response = await fetch(`https://localhost:7287/fitbit/${id}/weekly-sleep?weekNumber=${weekNumber}`, {
    headers: {
      accept: 'application/json',
    },
  });
  if (!response.ok) {
    console.error('Failed fetching sleep data');
    return;
  }
  sleepData.value = await response.json();
}

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
  fetchSleepData(userId, selectedWeek.value);
});

watch(selectedWeek, (newWeekNumber) => {
  const userId = Number(route.params.id);
  fetchSleepData(userId, newWeekNumber);
});

const selectedWeekData = computed(() => {
  const weekData = activityData.value.find(data => data.weekNumber === selectedWeek.value);
  return weekData ? weekData : null;
});

const selectedSleepData = computed(() => {
  const sleepDataWeekNumber = sleepData.value.find(data => data.weekNumber === selectedWeek.value);
  return sleepDataWeekNumber ? sleepDataWeekNumber : null;
});

const getWeekStartAndEndDate = (weekNumber, year) => {
  const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const dow = simple.getDay();
  const weekStart = new Date(simple);
  if (dow <= 4)
    weekStart.setDate(simple.getDate() - simple.getDay() + 1); // adjust to previous Monday
  else
    weekStart.setDate(simple.getDate() + 8 - simple.getDay()); // adjust to next Monday
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return { weekStart, weekEnd };
};

const startDate = computed(() => {
  const { weekStart } = getWeekStartAndEndDate(selectedWeek.value, currentDate.getFullYear());
  return weekStart.toLocaleDateString();
});

const endDate = computed(() => {
  const { weekEnd } = getWeekStartAndEndDate(selectedWeek.value, currentDate.getFullYear());
  return weekEnd.toLocaleDateString();
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
  