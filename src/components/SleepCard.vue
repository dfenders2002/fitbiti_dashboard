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
    averageMinutesAwake: {
      type: Number,
      required: true,
    },
    maxMinutesAwake: {
      type: Number,
      required: true,
    },
    minMinutesAwake: {
      type: Number,
      required: true,
    },
    averageMinutesREMSleep: {
      type: Number,
      required: true,
    },
    maxMinutesREMSleep: {
      type: Number,
      required: true,
    },
    minMinutesREMSleep: {
      type: Number,
      required: true,
    },
    averageMinutesLightSleep: {
      type: Number,
      required: true,
    },
    maxMinutesLightSleep: {
      type: Number,
      required: true,
    },
    minMinutesLightSleep: {
      type: Number,
      required: true,
    },
    averageMinutesDeepSleep: {
      type: Number,
      required: true,
    },
    maxMinutesDeepSleep: {
      type: Number,
      required: true,
    },
    minMinutesDeepSleep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              position: 'top',
              maxItems: 2,
              hideOverflowingLabels: false,
              style: {
                fontSize: '13px',
                fontWeight: 900,
                colors: ['#ffffff'],
              },
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: 0,
          style: {
            fontSize: '12px',
            colors: ['#ffffff'],
          },
        },
        xaxis: {
          categories: ['Minimaal', 'Gemiddeld', 'Maximaal'],
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
        yaxis: {
          title: {
            text: '',
            style: {
              color: '#fff',
            },
          },
          labels: {
            style: {
              colors: '#fff',
            },
            formatter: function (value) {
              return value + ' min - ' + (value / 60).toFixed(1) + ' uren';
            },
          },
        },
        legend: {
          position: 'right',
          offsetY: 40,
          labels: {
            colors: ['#fff'],
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: true,
            style: {
              fontSize: '14px',
            },
          },
        },
      },
      chartSeries: [],
    };
  },
  watch: {
    averageMinutesAwake: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    maxMinutesAwake: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    minMinutesAwake: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    averageMinutesREMSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    maxMinutesREMSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    minMinutesREMSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    averageMinutesLightSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    maxMinutesLightSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    minMinutesLightSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    averageMinutesDeepSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    maxMinutesDeepSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
    minMinutesDeepSleep: {
      immediate: true,
      handler(value) {
        this.updateChartSeries();
      },
    },
  },
  methods: {
    updateChartSeries() {
      this.chartSeries = [
        {
          name: 'Minuten wakker',
          data: [this.minMinutesAwake, this.averageMinutesAwake, this.maxMinutesAwake],
        },
        {
          name: 'Minuten REM slaap',
          data: [this.minMinutesREMSleep, this.averageMinutesREMSleep, this.maxMinutesREMSleep],
        },
        {
          name: 'Minuten lichte slaap',
          data: [this.minMinutesLightSleep, this.averageMinutesLightSleep, this.maxMinutesLightSleep],
        },
        {
          name: 'Minuten diepe slaap',
          data: [this.minMinutesDeepSleep, this.averageMinutesDeepSleep, this.maxMinutesDeepSleep],
        },
      ];
    },
    calculateTotal(data) {
      return data.reduce((a, b) => a + b, 0);
    }
  },
};
</script>


  <style>
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
  .apexcharts-menu.apexcharts-menu-open {
  background-color: #2d363d !important;
}

.apexcharts-menu.apexcharts-menu-open .apexcharts-menu-item {
  background-color: #2d363d !important;
  color: #ffffff !important;
}

.apexcharts-menu.apexcharts-menu-open .apexcharts-menu-item:hover {
  background-color: #2d363d !important;
  opacity: 0.6;
  color: #ffffff !important;
}


  </style> 