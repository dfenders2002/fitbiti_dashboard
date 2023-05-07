<template>
  <div class="sidebar">
    <h1 class="sidebar-title">FITBIT</h1>
    <ul class="sidebar-menu">
      <li :class="{'active': activeItem === 'users'}" @click="activeItem = 'users'">
        <span class="sidebar-menu-icon">
          <font-awesome-icon icon="user" />
        </span>
        <span class="sidebar-menu-label">Users</span>
      </li>
      <li :class="{'active': activeItem === 'addUser'}" @click="activeItem = 'addUser'">
        <span class="sidebar-menu-icon">
          <font-awesome-icon icon="user-plus" />
        </span>
        <span class="sidebar-menu-label">Add User</span>
      </li>
      <li :class="{'active': activeItem === 'export'}" @click="activeItem = 'export'">
        <span class="sidebar-menu-icon">
          <font-awesome-icon icon="file-export" />
        </span>
        <span class="sidebar-menu-label">Export data</span>
      </li>
    </ul>
    <div class="sidebar-logout">
      <button class="sidebar-logout-button">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: 'users'
    }
  }
}
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
</style>
