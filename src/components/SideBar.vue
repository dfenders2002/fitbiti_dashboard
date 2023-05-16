<template>
  <div class="sidebarcontainer">
    <div class="sidebar">
      <div class="hamburger_icon" @click="toggleHamburger">
        <div class="icon"></div>
      </div>

      <div class="sidebar-header px-5">
        <div class="row">
          <h4 class="d-flex align-items-center px-2">Fitbit</h4>
        </div>
      </div>

      <div class="sidebar-tag">
        <ul id="tags" class="list-group list-group-flush">
          <li
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            v-for="(tag, index) in tagList"
            :key="index"
            :class="{ 'act': isTagHidden(index) }"
          >
            <a href="#" class="nav-link">{{ tag.name }}</a>
            <span class="badge badge-warning badge-pill text-light">{{ tag.count }}</span>
          </li>
        </ul>
      </div>

      <div class="sidebar-menu mt-5">
        <div class="container">
          <ul class="list-group">

            <router-link to="/dashboard">
              <li class="list-group-item">DASHBOARD</li>
            </router-link>

            <router-link to="/addFitbit">
              <li class="list-group-item">ADD FITBIT</li>
            </router-link>

            <router-link to="/export">
              <li class="list-group-item">EXPORT DATA</li>
            </router-link>
            
            <router-link to="/addUser">
              <li class="list-group-item">ADD USER</li>
            </router-link>
          </ul>
        </div>
      </div>
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
    const hamburgerIcon = document.querySelector(".hamburger_icon");
    const sidebar = document.querySelector(".sidebar");

    hamburgerIcon.addEventListener("click", () => {
            hamburgerIcon.classList.toggle("active");
            sidebar.classList.toggle("scroll");
        });
  },
});
</script>

<style>
.sidebarcontainer{
  background-color: #2d363d;
}
.sidebar {
    position: relative;
    width: 300px;
    background: #2d363d;
    height: 100vh;
    font-family: 'Titillium Web', sans-serif;
    left: -300px;
    transition: 1s;
}

.sidebar.scroll {
    left: 0px;
}

.sidebar .hamburger_icon {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    right: -50px;
    cursor: pointer;
}

.sidebar .hamburger_icon .icon {
    position: relative;
    width: 40px;
    height: 7px;
    top: 20px;
    left: 5px;
    background: #f9f9eb;
    transition: .4s;
}

.sidebar .hamburger_icon.active .icon {
    background: none;
    left: -50px;
}

.sidebar .hamburger_icon .icon:before,
.sidebar .hamburger_icon .icon:after {
    content: "";
    position: absolute;
    width: 40px;
    height: 7px;
    background: #f9f9eb;
    transition: .6s;
}

.sidebar .hamburger_icon .icon:before {
    top: -10px;
}

.sidebar .hamburger_icon .icon:after {
    top: 10px;
}

.sidebar .hamburger_icon.active .icon:before {
    top: 5px;
    transform: rotate(45deg);
    background: #f9f9eb;
}

.sidebar .hamburger_icon.active .icon:after {
    top: 5px;
    transform: rotate(-225deg);
    background: #f9f9eb;
}

.sidebar .sidebar-header {
    margin-bottom: 40px;
    padding-top: 40px !important;
}

.sidebar .sidebar-header img {
    width: 60px;
    height: 60px;
    background-size: cover;
}

.sidebar .sidebar-header h4 {
    color: #f9f9eb;
}

.sidebar .sidebar-search {
    overflow: hidden;
    height: 40px;
}

.sidebar .sidebar-tag {
    height: 180px;
    overflow: scroll;
}

.sidebar .sidebar-tag::-webkit-scrollbar {
    display: none;
}

.sidebar .sidebar-tag li {
    height: 36px;
    cursor: pointer;
    display: block;
}

.sidebar .sidebar-tag li.act {
    display: none !important;
}

.sidebar .sidebar-menu .list-group li {
    background: #5a68ff;
    color: #f9f9eb;
    cursor: pointer;
    transition: .5s;
}

.sidebar .sidebar-menu .list-group li:hover {
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, .3);
}

.sidebar .sidebar-menu .list-group li:active {
    background: #5a68ff;
}
</style>