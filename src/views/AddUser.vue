<template>
  <side-bar></side-bar>
  <div class="page">
    <div class="adduser">
      <h1>Add User</h1>
      <form class="form">
        <label>
          <span>Username:</span>
          <input class="textfield" type="text" v-model="username" placeholder="Type hier" />
        </label>
        <span v-if="!username && isSubmitted" class="error-message">Vul een username in</span>
        <label>
          <span>Password:</span>
          <input class="textfield" type="password" v-model="password" placeholder="Type hier" />
        </label>
        <span v-if="!password && isSubmitted" class="error-message">Vul een wachtwoord in</span>
        <button class="submit" type="button" @click="submitForm">Add</button>
        <span v-if="isSuccess" class="success-message">User has been added</span>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';

export default defineComponent({
  components: { SideBar },
  data() {
    return {
      username: '',
      password: '',
      isSubmitted: false,
      isSuccess: false,
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitted = true;
      this.isSuccess = false;
      if (!this.username || !this.password) {
        return;
      }

      try {
        const response = await axios.post('https://localhost:7034/FitBitAuth/register', {
          username: this.username,
          password: this.password,
        });
        if (response.status === 200) {
          this.username = '';
          this.password = '';
          this.isSubmitted = false; // reset submission status after successful addition
          this.isSuccess = true; // set success flag true to show the success message
        } else {
          console.error('Failed to add user');
        }
      } catch (error) {
        console.error(error);
      }
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
.adduser {
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
    margin-bottom: 1rem;
}

span{
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

.error input {
    border-color: red;
}

.error-message {
    color: red;
}

.error-border {
    border-color: red;
}

.success-message{
  padding-top: 20px;
  font-size: 22px;
  color: green;
}
</style>