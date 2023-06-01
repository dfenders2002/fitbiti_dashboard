<template>
  <div class="calories-card">
    <div class="calories-title">Calorieën verbrand</div>
    <div class="calories-chart-container">
      <apexchart type="bar" height="240" :options="chartOptions" :series="series" />
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
      series: [{
        name: 'Calories',
        data: [this.minCalories, this.averageCalories, this.maxCalories]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + " cal";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#ffffff"]
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Minimaal', 'Gemiddeld', 'Maximaal'],
          labels: {
            style: {
              colors: '#fff'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Calories',
            style: {
              color: '#fff'
            }
          },
          labels: {
            style: {
              colors: '#fff'
            }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " cal"
            }
          }
        }
      },
    };
  },
  watch: {
    averageCalories(newVal) {
      this.series[0].data[1] = newVal;
    },
    maxCalories(newVal) {
      this.series[0].data[2] = newVal;
    },
    minCalories(newVal) {
      this.series[0].data[0] = newVal;
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
