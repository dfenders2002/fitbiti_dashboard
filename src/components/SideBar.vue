<template>
  <div class="sidebar">
    <h1 class="sidebar-title">FITBIT</h1>
    <ul class="sidebar-menu">

      <router-link to="/dashboard" custom v-slot="{ navigate }">
        <li :class="{'active': activeItem === 'dashboard'}" @click="activateAndNavigate('dashboard', navigate)" v-if="store.state.isLoggedIn">
          <span class="sidebar-menu-icon">
            <font-awesome-icon icon="user" />
          </span>
          <span class="sidebar-menu-label">Dashboard</span>
        </li>
      </router-link>

      <router-link to="/addFitbit" custom v-slot="{ navigate }">
        <li :class="{'active': activeItem === 'addFitbit'}" @click="activateAndNavigate('addFitbit', navigate)" v-if="store.state.isLoggedIn">
          <span class="sidebar-menu-icon">
            <font-awesome-icon icon="user-plus" />
          </span>
          <span class="sidebar-menu-label">Add FitBit</span>
        </li>
      </router-link>
      
      <router-link to="/export" custom v-slot="{ navigate }">
        <li :class="{'active': activeItem === 'export'}" @click="activateAndNavigate('export', navigate)" v-if="store.state.isLoggedIn">
          <span class="sidebar-menu-icon">
            <font-awesome-icon icon="file-export" />
          </span>
          <span class="sidebar-menu-label">Export data</span>
        </li>
      </router-link>

      <router-link to="/addUser" custom v-slot="{ navigate }">
        <li :class="{'active': activeItem === 'addUser'}" @click="activateAndNavigate('addUser', navigate)" v-if="store.state.isLoggedIn">
          <span class="sidebar-menu-icon">
            <font-awesome-icon icon="user-plus" />
          </span>
          <span class="sidebar-menu-label">Add user</span>
        </li>
      </router-link>


    <div class="sidebar-login" v-if="!store.state.isLoggedIn">
      <button class="sidebar-login-button" @click="performLogin">Log In</button>
    </div>
      
    </ul>
    <div class="sidebar-logout" v-if="store.state.isLoggedIn">
      <button class="sidebar-logout-button" @click="performLogout">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../store/store';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const store = useStore();
    const activeItem = ref(store.state.activeItem);

    const activateItem = (item: string) => {
      store.commit('setActiveItem', item);
      activeItem.value = item;
    };
    const activateAndNavigate = (item: string, navigate: () => void) => {
      activateItem(item);
      navigate();
    };

    return {
      activateAndNavigate,
      activeItem,
      activateItem,
      store,
    };
  },
  methods: {
    performLogout() {
      this.store.commit('logout');
      this.$router.push('/');
      this.$emit('logout');
    },
    performLogin() {
      this.$router.push('/');
    },
  },
  beforeRouteUpdate(to, from, next) {
    const item = to.path.split('/')[1];
    this.activateItem(item);
    next();
  },
  mounted() {
    const currentPath = this.$route.path;
    const item = currentPath.split('/')[1];
    this.activateItem(item);
  },
});


</script>




<style scoped>
.sidebar {
  background-color: #2d363d;
  min-height: 100vh;
  width: 200px;
  padding-top: 35px;
}

.sidebar-title {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  margin-bottom: 15px;
}

.sidebar-menu .sidebar-menu-icon {
  display: inline-block;
  width: 24px;
  text-align: center;
  margin-right: 10px;
  color: white;
}

.sidebar-menu .sidebar-menu-label {
  display: inline-block;
  vertical-align: middle;
  color: white;
}

.sidebar-menu .active {
  background-color: #5a68ff;
}

.sidebar-logout {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  padding-bottom: 50px;
}

.sidebar-logout-button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #5a68ff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.sidebar-logout-button:hover {
  background-color: #444fac;
}

.sidebar-login {
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  padding-bottom: 50px;
}

.sidebar-login-button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #5a68ff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.sidebar-login-button:hover {
  background-color: #444fac;
}

</style>
