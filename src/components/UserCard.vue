<template>
  <div class="user-card">
    <font-awesome-icon icon="user" class="user-icon" />
    <div class="user-info">
      <div class="edit-row">
        <h2 class="name">{{ user.pid }}</h2>
        <button class="edit-button" @click="editUser(user.id, user.diagnose, user.pid, user.inTreatment, $event)">Bewerk</button>
      </div>
      <p class="text">Leeftijd: {{ user.age }}</p>
      <p class="text">Lengte: {{ user.heightCm }} cm</p>
      <p class="text">Gewicht: {{ user.weightKg }} kg</p>
      <p class="text">Ziekte: {{ user.diagnose }}</p>
      <p class="text">In behandeling: {{ user.inTreatment ? 'ja' : 'nee' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserList from '@/views/UserList.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

function editUser(id: number, diagnose: string, pid: string, inBehandeling: boolean, event: MouseEvent) {
  event.stopPropagation();
  router.push({ 
    path: `/edit/${id}`, 
    query: { diagnose, pid, inBehandeling } 
  }); 
}


</script>



  
<style scoped>
button{
  margin-top: 0;
  widows: 200;
}
.edit-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.name {
  margin-right: 1rem;
}

.edit-button {
  padding: 0.5rem 1rem;
}

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
  width: 100%;
}

.name {
  margin: 0;
  font-size: 24px;
}

.text {
  font-size: 18px;
}
</style>
  