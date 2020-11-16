<template>
  <div>
    <el-row>
      <el-col :span="8">School/College/University</el-col>
      <el-col :span="16"><el-input v-model="education.school" @input="handleInput"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Degree</el-col>
      <el-col :span="16"><el-input v-model="education.degree" @input="handleInput"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Start Date</el-col>
      <el-col :span="16"><el-date-picker v-model="education.start_date" @input="handleInput" format="yyyy-MM-dd" value-format="yyyy-MM-dd" /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">End Date</el-col>
      <el-col :span="16"><el-date-picker v-model="education.end_date" @input="handleInput" format="yyyy-MM-dd" value-format="yyyy-MM-dd" /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Description/Achievements</el-col>
      <el-col :span="16"><el-input type="textarea" v-model="education.description" @input="handleInput"/></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'EducationEdit',

  props: ['value'],
  data () {
    return {
      education: this.value
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.education)
    }
  },
}
</script>


<style scoped>

</style>
