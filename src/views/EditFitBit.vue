<template>
  <side-bar></side-bar>
  <div class="page">
    <div class="edit-user">
      <div class="edit-user-box">
        <div class="header">
          <h1>Bewerk Fitbit gebruiker</h1>
          <button class="delete-btn" @click.prevent="deleteUser">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="edit">
            <label>
              <span class="label-text">Patient Identification Number:</span>
              <input class="textfield" type="text" v-model="pid" placeholder="Enter Pid" />
            </label>
          </div>
          <div class="edit">
            <label>
              <span class="label-text">Diagnose:</span>
              <input class="textfield" type="text" v-model="diagnose" placeholder="Enter Diagnose" />
            </label>
          </div>
          <div class="checkbox-label">
            <span class="label-text">In behandeling</span>
            <input class="checkbox" type="checkbox" v-model="inBehandeling" />
          </div>
          <button class="submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/components/SideBar.vue';

export default defineComponent({
  components: { SideBar },
  data() {
    return {
      pid: '',
      diagnose: '',
      inBehandeling: false,
    };
  },
  created() {
    this.pid = this.$route.query.pid || '';
    this.diagnose = this.$route.query.diagnose || '';
    this.inBehandeling = this.$route.query.inBehandeling === 'true' || false;
  },
  methods: {
    submitForm() {
      const id = this.$route.params.id;
      // Maak een PUT-verzoek om de Fitbit-gebruiker bij te werken
      fetch(`https://localhost:7287/fitbit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          pid: this.pid,
          diagnose: this.diagnose,
          inTreatment: this.inBehandeling,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User updated:', data);
          window.location.href = 'http://127.0.0.1:5173/dashboard';
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },
    deleteUser() {
      const id = this.$route.params.id;
      fetch(`https://localhost:7287/fitbit/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('User deleted');
            window.location.href = 'http://127.0.0.1:5173/dashboard';
          } else {
            throw new Error('Failed to delete user');
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },
  },
});
</script>

  
  
  <style scoped>
  .page {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
  .edit {
    display: flex;
    flex-direction: column;
  }
  .edit-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    flex-grow: 2;
    padding: 2rem;
    padding-top: 10rem;
    background-color: #121528;
    color: white;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .delete-btn {
    background: red;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    margin-top: 0;
  }
  
  .label-text {
    font-size: 22px;
    margin-bottom: 0.25rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .checkbox {
    width: 30px;
    height: 30px;
    margin: 0;
    background-color: #2d363d;
  }
  
  /* Rest of the styling... */
  
  .textfield {
    background: #2d363d;
    height: 50px;
    padding-left: 10px;
    width: 500px;
    color: white;
    font-size: 20px;
    border: 2px solid #2d363d;
  }
  
  .textfield::placeholder {
    color: grey;
    font-size: 20px;
  }
  
  h1 {
    margin-bottom: 0;
  }
  
  span {
    font-size: 18px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }
  
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  label span {
    margin-bottom: 0.25rem;
  }
  
  .submit {
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
    height: 50px;
    font-size: 22px;
  }
  </style>
  