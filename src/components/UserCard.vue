<template>
  <div class="user-card" @click="$emit('click')">
    <font-awesome-icon icon="user" class="user-icon" />
    <div class="user-info">
      <h2 class="name">{{ user.pid }}</h2>
      <p class="text">Leeftijd: {{ user.age }}</p>
      <p class="text">Lengte: {{ user.heightCm }} cm</p>
      <p class="text">Gewicht: {{ user.weightKg }} kg</p>
      <p class="text">Ziekte: {{ user.diagnose }}</p>
      <p class="text">In behandeling: {{ user.intreatmentnow ? 'ja' : 'nee' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

</script>
  
<style scoped>
.user-card {
  background-color: #2d363d;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-icon {
  font-size: 40px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin-right: 40px;
  color: #5a68ff;
}


.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-left: 20px;
}

.name {
  margin: 0;
  margin-bottom: 10px;
  font-size: 24px;
}

.text {
  font-size: 18px;
}
</style>
  