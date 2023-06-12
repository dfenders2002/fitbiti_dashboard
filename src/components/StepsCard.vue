<template>
  <div class="steps-card">
    <div class="steps-title">Stappen</div>
    <div class="steps-chart-container">
      <apexchart type="bar" height="240" :options="chartOptions" :series="chartSeries" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'StepsCard',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    averageSteps: {
      type: Number,
      required: true,
    },
    maxSteps: {
      type: Number,
      required: true,
    },
    minSteps: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartSeries: [
        {
          name: 'Minimaal',
          data: [this.minSteps],
        },
        {
          name: 'Gemiddeld',
          data: [this.averageSteps],
        },
        {
          name: 'Maximaal',
          data: [this.maxSteps],
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
          },
        },
        colors: ['#00E396', '#feb019', '#FF4560'], //['#90e0ef', '#00b4d8', '#023e8a'],
        tooltip: {
          theme: 'dark',
          y: {
            formatter: function (val) {
              return val;
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
  // In StepsCard component
  watch: {
    averageSteps: {
      handler(newVal) {
        this.chartSeries[1].data = [newVal];
      },
      immediate: true,
    },
    maxSteps: {
      handler(newVal) {
        this.chartSeries[2].data = [newVal];
      },
      immediate: true,
    },
    minSteps: {
      handler(newVal) {
        this.chartSeries[0].data = [newVal];
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.steps-card {
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

.steps-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.steps-chart-container {
  width: 100%;
  height: 300px;
}
</style>
