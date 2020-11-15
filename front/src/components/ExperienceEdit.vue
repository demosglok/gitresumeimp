<template>
  <div>
    <el-row>
      <el-col :span="8">Company</el-col>
      <el-col :span="16"><el-input v-model="experience.company" @input="handleInput"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Position</el-col>
      <el-col :span="16"><el-input v-model="experience.position" @input="handleInput"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Start Date</el-col>
      <el-col :span="16"><el-date-picker v-model="experience.start_date" @input="handleInput" format="yyyy-MM-dd" value-format="yyyy-MM-dd" /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">End Date</el-col>
      <el-col :span="16"><el-date-picker v-model="experience.end_date" @input="handleInput" format="yyyy-MM-dd" value-format="yyyy-MM-dd" /></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Description/Achievements</el-col>
      <el-col :span="16"><el-input type="textarea" v-model="experience.achievement" @input="handleInput"/></el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'ExperienceEdit',

  props: ['value'],
  data () {
    return {
      experience: this.value
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.experience)
    }
  },
}
</script>


<style scoped>

</style>
