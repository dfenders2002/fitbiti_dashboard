<template>
  <SideBar></SideBar>
  <div class="page">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1 class="dashboard-heading">{{ user.pid }} - {{ user.age }} jaar - {{ user.height }} cm - {{ user.weight }} kg -
          ziekte: {{ user.disease }}</h1>
        <button class="dashboard-back-button" @click="goToUserList">Go Back</button>
        <input class="dashboard-week-button" type="week" v-model="selectedWeekString">
      </div>
      <div class="grid-container-data">
        <DistanceTraveledCard :data="filteredActivitiesData" />
      </div>
      <div class="grid-container-3">
        <HeartBeatCard :data="filteredHeartRateData" />
        <SleepCard :data="filteredSleepData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DistanceTraveledCard from '../components/DistanceTraveledCard.vue';
import HeartBeatCard from '../components/HeartBeatCard.vue';
import SleepCard from '../components/SleepCard.vue';
import SideBar from '../components/SideBar.vue';
import users from '../../mockdata.json';

const props = defineProps({
  pid: {
    type: String,
    required: true
  },
  users: {
    type: Array,
    required: true
  }
});

const route = useRoute();
const router = useRouter();

const user = computed(() => {
  const pid = props.pid;
  return props.users.find((user) => user.pid === pid);
});

const selectedWeek = ref(getCurrentWeek());

const selectedWeekString = computed({
  get: () => {
    const year = selectedWeek.value.getFullYear();
    const weekNumber = getWeekNumber(selectedWeek.value);
    return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
  },
  set: (value) => {
    selectedWeek.value = parseWeekString(value);
  }
});

const filteredActivitiesData = computed(() => filterData(user.value?.activities, 'Date'));
const filteredHeartRateData = computed(() => filterData(user.value?.heartrate, 'Date'));
const filteredSleepData = computed(() => filterData(user.value?.sleep, 'StartTime'));

function goToUserList() {
  router.push({ name: 'UserList' });
}

function filterData(data, key) {
  if (!selectedWeek.value || !data) {
    return [];
  }

  const startOfWeek = getStartOfWeek(selectedWeek.value);
  const endOfWeek = getEndOfWeek(selectedWeek.value);

  return data.filter((item) => {
    const itemDate = new Date(item[key]);
    return itemDate >= startOfWeek && itemDate <= endOfWeek;
  });
}

function getStartOfWeek(date) {
  const result = new Date(date);
  result.setDate(result.getDate() - result.getDay());
  return result;
}

function getEndOfWeek(date) {
  const result = new Date(date);
  result.setDate(result.getDate() - result.getDay() + 6);
  return result;
}

function getCurrentWeek() {
  const today = new Date();
  const weekStartDate = getStartOfWeek(today);
  return weekStartDate;
}

function parseWeekString(weekString) {
  const [year, weekNumber] = weekString.split('-W');
  const weekStartDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  return getStartOfWeek(weekStartDate);
}

function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - oneJan) / 86400000);
  return Math.ceil((dayOfYear + oneJan.getDay() + 1) / 7);
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
  padding-top: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-right: 20px;
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

.dashboard-week-button {
  background-color: #2d363d;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
}
</style>
