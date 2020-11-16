<template>
  <el-menu
    default-active="/home"
    mode="horizontal"
    :router="true"
    background-color="#242c34"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
  <el-menu-item index="/home">Home</el-menu-item>
  <el-menu-item index="/resume">View Resume</el-menu-item>
  <el-menu-item index="/edit">Edit Resume</el-menu-item>
  <el-menu-item index="/viewbyaccount">View Resume by Account</el-menu-item>
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
