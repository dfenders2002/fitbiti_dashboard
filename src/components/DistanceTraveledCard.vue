<template>
    <div class="distance-card">
      <div class="distance-title">Afstand afgelegd:</div>
      <div class="distance-chart-container">
        <apexchart type="radialBar" :options="chartOptions" :series="series" />
      </div>
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
        series: [40],
        chartOptions: {
          chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '60%',
              },
              dataLabels: {
                show: true,
                name: {
                  offsetY: -10,
                  fontSize: '22px',
                  color: '#888',
                  fontFamily: 'Roboto, sans-serif',
                },
                value: {
                  color: '#fff',
                  fontSize: '36px',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 'bold',
                  offsetY: 5,
                },
                total: {
                  show: true,
                  label: 'Kilometers',
                  color: '#888',
                  formatter: function () {
                    return '10';
                  },
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '22px',
                  offsetY: -10,
                },
              },
              track: {
                background: '#eee',
                strokeWidth: '90%',
                margin: 5,
              },
              data: [53],
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#E58C21', '#F5F508'],
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },

          stroke: {
            lineCap: 'round',
          },
          labels: ['Kilometers'],
        },
      };
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
  
  </style> 