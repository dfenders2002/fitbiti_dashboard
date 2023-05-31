<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Slaap</h2>
    </div>
    <div class="card-body">
      <apexchart type="bar" :options="chartOptions" :series="chartSeries"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: 'SleepCard',
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
          height: '100%',
          animations: {
            enabled: false,
          },
          zoom: {
            enabled: false,
          },
          foreColor: '#fff',
        },
        xaxis: {
          categories: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '70%',
            endingShape: 'rounded',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 1,
            gradientToColors: ['#43cea2'],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
      },
      chartSeries: [],
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newData) {
        this.updateChartSeries(newData);
      },
    },
  },
  methods: {
    updateChartSeries(data) {
      const chartData = data.map((item) => item.MinutesAsleep / 60);
      this.chartSeries = [{ name: 'Uren geslapen', data: chartData }];
    },

  },
};
</script>

<style scoped>
.card {
  background-color: #2d363d;
  border-radius: 10px;
  padding: 20px;
}

.card-header {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}

.card-body {
  height: 100%;
}

.apexcharts-tooltip {
  font-size: 14px;
}

.apexcharts-xaxistooltip {
  font-size: 14px;
}
</style>
