<template>
    <div class="calories-card">
      <div class="calories-title">Calories burned:</div>
      <div class="calories-chart-container">
        <apexchart type="radialBar" :options="chartOptions" :series="series" />
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
    data() {
      return {
        series: [67],
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
                  label: 'Calories',
                  color: '#888',
                  formatter: function () {
                    return '3000';
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
              data: [66.7],
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#e82f52'],
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: {
            lineCap: 'round',
          },
          labels: ['Calories'],
        },
      };
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
  }
  
  .calories-chart-container {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  </style>
  