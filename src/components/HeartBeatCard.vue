<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">Hartslag</h2>
    </div>
    <div class="card-body">
      <div class="heartbeat-content">
        <div class="heartbeat-image">
          <img class="heartbeat-img" src="@/data/hart.png" alt="Hartslag afbeelding" />
        </div>
        <div class="heartbeat-text">
          <p>Average Heart Rate: {{ averageHeartRateInRest }}</p>
          <p>Max Heart Rate: {{ maxHeartRateInRest }}</p>
          <p>Min Heart Rate: {{ minHeartRateInRest }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeartBeatCard',
  props: {
    averageHeartRateInRest: {
      type: Number,
      required: true,
    },
    maxHeartRateInRest: {
      type: Number,
      required: true,
    },
    minHeartRateInRest: {
      type: Number,
      required: true,
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
  margin-bottom: 20px;
}

.card-title {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: #fff;
}

.card-body {
  height: 100%;
}

.heartbeat-content {
  display: flex;
  align-items: center;
}

.heartbeat-image {
  margin-right: 20px;
}

.heartbeat-img {
  max-width: 300px; /* Pas de breedte aan naar wens */
  max-height: 300px; /* Pas de hoogte aan naar wens */
}

.heartbeat-text p {
  margin: 5px 0;
  color: #fff;
  font-size: 22px;
}
</style>
