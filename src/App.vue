<template>
  <div id="app">
    <el-container>
      <el-header height="50px"><main-menu /></el-header>
      <el-main> <router-view /></el-main>
      <el-footer height="50px">(c) Dmytro Selin</el-footer>
    </el-container>
  </div>
</template>

<script>

import MainMenu from '@/components/menu';

export default {
  name: 'app',
  components: {
    MainMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<style scoped>
  .el-container {
    min-height: 100vh;
  }
  .el-main {
    min-height: calc(100% - 100px - 40px);
  }
</style>
