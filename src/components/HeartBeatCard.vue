<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Heart Rate</h2>
    </div>
    <div class="card-body">
      <div ref="chartContainer"></div>
    </div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";

export default {
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
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            stacked: false,
          },
        },
        xaxis: {
          categories: [], // Will be populated dynamically
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          min: 0,
          max: 160,
          title: {
            text: "BPM",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          offsetX: 0,
          offsetY: 10,
        },
        series: [
          {
            name: "Active Heart Rate",
            data: [],
          },
          {
            name: "Average Heart Rate",
            data: [],
          },
          {
            name: "Resting Heart Rate",
            data: [],
          },
        ],
      },
      chart: null,
    };
  },
  mounted() {
    this.prepareChartData();
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(newData) {
        this.prepareChartData();
        this.$nextTick(() => {
          this.renderChart();
        });
      },
    },
  },
  methods: {
    prepareChartData() {
      const categories = ["Active", "Average", "Resting"];
      const activeHeartRateData = [];
      const averageHeartRateData = [];
      const restingHeartRateData = [];

      if (this.data.length > 0) {
        const activeSum = this.data.reduce((sum, item) => sum + item.Active_heartrate, 0);
        const averageSum = this.data.reduce((sum, item) => sum + item.Average_heartrate, 0);
        const restingSum = this.data.reduce((sum, item) => sum + item.Resting_heartrate, 0);
        const averageActive = activeSum / this.data.length;
        const averageAverage = averageSum / this.data.length;
        const averageResting = restingSum / this.data.length;

        activeHeartRateData.push(averageActive.toFixed(2));
        averageHeartRateData.push(averageAverage.toFixed(2));
        restingHeartRateData.push(averageResting.toFixed(2));
      }

      this.chartOptions.xaxis.categories = categories;
      this.chartOptions.series[0].data = activeHeartRateData;
      this.chartOptions.series[1].data = averageHeartRateData;
      this.chartOptions.series[2].data = restingHeartRateData;
    },
    renderChart() {
      if (this.$refs.chartContainer) {
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new ApexCharts(this.$refs.chartContainer, this.chartOptions);
        this.chart.render();
      }
    },
  },
};
</script>

<style>
.card {
  margin-bottom: 20px;
}

.card-header {
  background-color: #2d363d;
  padding: 10px;
}

.card-title {
  margin: 0;
}

.card-body {
  padding: 20px;
}
</style>
