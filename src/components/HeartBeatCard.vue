<template>
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Heartbeat</h2>
      </div>
      <div class="card-body">
        <apexchart type="line" :options="chartOptions" :series="chartSeries"></apexchart>
      </div>
    </div>
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    name: 'HeartBeatCard',
    components: {
      apexchart: VueApexCharts,
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
            categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
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
          stroke: {
            curve: 'smooth',
            colors: ['#e82f52'],
            width: 3,
          },
          fill: {
            type: 'solid',
            colors: ['#2d363d'],
          },
        },
        chartSeries: [
          {
            name: 'Heartbeat',
            data: [70, 80, 85, 75, 90, 80, 85, 70, 80, 85, 75, 90, 80, 85, 70, 80, 85, 75, 90, 80, 85, 70, 80, 85],
          },
        ],
      };
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
    margin-bottom: 20px;
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
  