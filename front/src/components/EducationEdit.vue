<template>
  <div>
    <el-row>
      <el-col :span="8">School/College/University</el-col>
      <el-col :span="16"><el-input /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Degree</el-col>
      <el-col :span="16"><el-input /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Start Date</el-col>
      <el-col :span="16"><el-time-picker /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">End Date</el-col>
      <el-col :span="16"><el-time-picker /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Description/Achievements</el-col>
      <el-col :span="16"><el-input type="textarea"/></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'EducationEdit',
}
</script>


<style scoped>

</style>
