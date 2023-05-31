<template>
  <div class="distance-card">
    <div class="distance-title">Afstand afgelegd:</div>
    <div class="distance-chart-container">
      <apexchart type="radialBar" :options="chartOptions" :series="series" />
    </div>
    <div class="calories-burned">Calories Burned: {{ caloriesBurned }}</div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'DistanceTraveledCard',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [70],
      chartOptions: {
        // Chart options remain unchanged
      },
      caloriesBurned: 0,
    };
  },
  methods: {
    calculateCaloriesBurned() {
      // Calculate the sum of calories burned from the activities
      const activities = this.$store.state.activities; // Assuming the activities data is stored in Vuex store

      if (activities && activities.length > 0) {
        let totalCaloriesBurned = 0;
        activities.forEach((activity) => {
          totalCaloriesBurned += parseInt(activity.CaloriesBurned.replace(',', ''));
        });

        this.caloriesBurned = totalCaloriesBurned.toLocaleString();
      }
    },
  },
  created() {
    this.calculateCaloriesBurned();
  },
};
</script>

<style scoped>
.distance-card {
  background-color: #2d363d;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.distance-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.distance-chart-container {
  display: flex;
  align-items: center;
  position: relative;
}

.calories-burned {
  margin-top: 10px;
  font-size: 18px;
}
</style>

<style scoped>
.distance-card {
  background-color: #2d363d;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.distance-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.distance-chart-container {
  display: flex;
  align-items: center;
  position: relative;
}
</style> 