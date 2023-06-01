<template>
  <div class="distance-card">
    <div class="distance-title">Afstand gereisd</div>
    <div class="distance-chart-container">
      <apexchart type="bar" height="240" :options="chartOptions" :series="series" />
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
      series: [{
        name: 'Afstand',
        data: [this.minDistance, this.averageDistance, this.maxDistance]
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
            return val + " km";
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
            text: 'Afstand (km)',
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
              return val + " km"
            }
          }
        }
      },
    };
  },
  watch: {
    averageDistance(newVal) {
      this.series[0].data[1] = newVal;
    },
    maxDistance(newVal) {
      this.series[0].data[2] = newVal;
    },
    minDistance(newVal) {
      this.series[0].data[0] = newVal;
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
