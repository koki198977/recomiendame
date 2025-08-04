<template>
  <div id="app" class="app-container">
    <router-view />
  </div>
</template>

<script>
export default { name: 'App' };
</script>

<style>
.app-container {
  background-color: #000;
  min-height: 100vh;
  color: #fff;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>