<template>
    <div class="sidebar">
      <h1 class="sidebar-title">FITBIT</h1>
      <ul class="sidebar-menu">
        <li :class="{'active': activeItem === 'home'}" @click="activeItem = 'home'">
            <span class="sidebar-menu-icon">
                <font-awesome-icon icon="house" />
            </span>
          <span class="sidebar-menu-label">Home</span>
        </li>
        <li :class="{'active': activeItem === 'users'}" @click="activeItem = 'users'">
            <span class="sidebar-menu-icon">
                <font-awesome-icon icon="user" />
            </span>
          <span class="sidebar-menu-label">Add Users</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeItem: 'home'
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
  </style>
  