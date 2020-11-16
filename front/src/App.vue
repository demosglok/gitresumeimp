<template>
  <div id="app">
    <el-container>
      <el-header height="61px"><main-menu /></el-header>
      <el-main> <router-view /></el-main>
      <el-footer height="30px">(c) Dmytro Selin</el-footer>
    </el-container>
  </div>
</template>

<script>

import MainMenu from '@/components/menu';

export default {
  name: 'app',
  components: {
    MainMenu
  },
  mounted() {
    this.$store.dispatch('loadUser').then(user => {
      console.log('App.vue loaded user', user);
      if(user && this.$route.path != '/resume') {
        console.log('redirecting to resume');
        this.$router.push('/resume');
      } else if (!user && this.$route.path != '/home') {
        this.$router.push('/home');
      }
    });
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
body {
  margin: 0;
}
</style>
<style scoped>
  .el-container {
    min-height: 100vh;
  }
  .el-main {
    min-height: calc(100% - 100px - 40px);
    padding: 0;
  }
  .el-header {
    position: fixed;
    width: 100%;
    background-color: #242c34;
    z-index: 10;
  }
  .el-footer {
    font-size: 12px;
    line-height: 30px;
    background-color: #f7f7f7;
  }
</style>
