<template>
  <div class="floors-card">
    <div class="floors-title">Aantal verdiepingen</div>
    <div class="floors-chart-container">
      <apexchart type="bar" height="240" :options="chartOptions" :series="chartSeries" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'FloorsClimbedCard',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    averageFloors: {
      type: Number,
      required: true,
    },
    maxFloors: {
      type: Number,
      required: true,
    },
    minFloors: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartSeries: [
        {
          name: 'Minimaal',
          data: [this.minFloors],
        },
        {
          name: 'Gemiddeld',
          data: [this.averageFloors],
        },
        {
          name: 'Maximaal',
          data: [this.maxFloors],
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
              return value + ' verdiepingen';
            },
          },
        },
        colors: ['#FF4560', '#feb019', '#00E396'],
        tooltip: {
          theme: 'dark',
          y: {
            formatter: function (val) {
              return val + ' verdiepingen';
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
    averageFloors: {
      handler(newVal) {
        this.chartSeries[1].data = [newVal];
      },
      immediate: true,
    },
    maxFloors: {
      handler(newVal) {
        this.chartSeries[2].data = [newVal];
      },
      immediate: true,
    },
    minFloors: {
      handler(newVal) {
        this.chartSeries[0].data = [newVal];
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.floors-card {
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

.floors-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
}

.floors-chart-container {
  width: 100%;
  height: 300px;
}
</style>
