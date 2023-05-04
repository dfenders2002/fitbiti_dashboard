<template>
    <header class="app-bar">
      <div class="app-bar-content">
        <h1 class="app-bar-title">Dashboard</h1>
        <!-- Je kunt hier extra content toevoegen, zoals navigatielinks of knoppen -->
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppBar',
  };
  </script>
  
  <style scoped>
  .app-bar {
    background-color: #2d363d;
    height: 90px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  
  .app-bar-content {
    display: flex;
    align-items: center;
  }
  
  .app-bar-title {
    color: white;
    margin: 0;
  }
  </style>
  