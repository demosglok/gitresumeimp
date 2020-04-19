<template>
  <el-menu default-active="/home"  mode="horizontal" :router="true">
  <el-menu-item index="/home">Home</el-menu-item>
  <el-menu-item index="/resume">View Resume</el-menu-item>
  <el-menu-item index="/edit">Edit Resume</el-menu-item>
  <el-menu-item index="/about">About</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'MainMenu'
}
</script>

<style>

</style>