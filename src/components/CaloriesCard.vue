<template>
  <div class="calories-card">
    <div class="calories-title">Calorieën verbrand</div>
    <div class="calories-chart-container">
      <apexchart type="bar" height="240" :options="chartOptions" :series="chartSeries" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'CaloriesCard',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    averageCalories: {
      type: Number,
      required: true,
    },
    maxCalories: {
      type: Number,
      required: true,
    },
    minCalories: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartSeries: [
        {
          name: 'Minimaal',
          data: [this.minCalories],
        },
        {
          name: 'Gemiddeld',
          data: [this.averageCalories],
        },
        {
          name: 'Maximaal',
          data: [this.maxCalories],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 20,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
            barHeight: '80%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [''],
          labels: {
            style: {
              colors: ['#fff'],
              fontSize: '14px',
              fontWeight: 0,
            },
            formatter: function (value) {
              return value + ' kcal';
            },
          },
        },
        colors: ['#FF4560', '#feb019', '#00E396'],
        tooltip: {
          theme: 'dark',
          y: {
            formatter: function (val) {
              return val + ' cal';
            },
          },
        },
        legend: {
          labels: {
            colors: ['#fff'],
            useSeriesColors: false,
          },
        },
      },
    };
  },
  watch: {
    averageCalories: {
      handler(newVal) {
        this.chartSeries[1].data = [newVal];
      },
      immediate: true,
    },
    maxCalories: {
      handler(newVal) {
        this.chartSeries[2].data = [newVal];
      },
      immediate: true,
    },
    minCalories: {
      handler(newVal) {
        this.chartSeries[0].data = [newVal];
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.calories-card {
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

.calories-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.calories-chart-container {
  width: 100%;
  height: 300px;
}
</style>
