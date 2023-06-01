<template>
  <div class="distance-card">
    <div class="distance-title">Afstand afgelegd</div>
    <div class="distance-chart-container">
      <apexchart type="bar" height="240" :options="chartOptions" :series="chartSeries" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'DistanceTraveldCard',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    averageDistance: {
      type: Number,
      required: true,
    },
    maxDistance: {
      type: Number,
      required: true,
    },
    minDistance: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartSeries: [
        {
          name: 'Minimaal',
          data: [this.minDistance],
        },
        {
          name: 'Gemiddeld',
          data: [this.averageDistance],
        },
        {
          name: 'Maximaal',
          data: [this.maxDistance],
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
              return value + ' km';
            },
          },
        },
        colors: ['#00E396', '#feb019', '#FF4560'],//['#52b788', '#40916c', '#2d6a4f'],
        tooltip: {
          theme: 'dark',
          y: {
            formatter: function (val) {
              return val + ' km';
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
    averageDistance: {
      handler(newVal) {
        this.chartSeries[1].data = [newVal];
      },
      immediate: true,
    },
    maxDistance: {
      handler(newVal) {
        this.chartSeries[2].data = [newVal];
      },
      immediate: true,
    },
    minDistance: {
      handler(newVal) {
        this.chartSeries[0].data = [newVal];
      },
      immediate: true,
    },
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
  color: white;
}

.distance-chart-container {
  width: 100%;
  height: 300px;
}
</style>
