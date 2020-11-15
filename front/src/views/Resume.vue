<template>
  <div class="wrapper">
      <template v-if="resume">
        <el-row>
          <el-col :span="12">
            <resume-raw :resume="resume" />
          </el-col>
          <el-col :span="12">
            <resume-formatted :resume="resume" />
          </el-col>
        </el-row>
        <div class="buttonsWrapper">
          <el-button type="success" @click="editResumeClick">Edit</el-button>
        </div>
      </template>
      <template v-else>
        <h2>No gitresume detected in your github account.</h2>
        <div> Do you want to create one?</div>
        <div v-if="readmeResume">
          But README.md detected on your account, you can keep it as is or overwrite with your resume in text human-readable form
          once its created
        </div>
        <div class="buttonsWrapper">
          <el-button type="success" @click="createResumeClick">Create</el-button>
        </div>
      </template>

  </div>
</template>

<script>

import ResumeRaw from '@/components/resume/raw';
import ResumeFormatted from '@/components/resume/formatted';

export default {
  name: 'Resume',
  data() {
    return {
      loading: true,
      enteredlogin: null
    }
  },
  computed: {
    resume() {
      return this.$store.state.resume;
    },
    readmeResume() {
      return this.$store.state.readme_resume;
    }
  },
  components: {
    ResumeRaw,
    ResumeFormatted
  },
  methods: {
    createResumeClick() {
      this.$router.push('/edit');
    },
    editResumeClick() {
      this.$router.push('/edit');
    }
  },
  mounted() {
    if(!this.$store.state.resume) {
      this.$store.dispatch('loadResume').then(res => console.log('loaded', res));
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin-top: 100px;
}
.buttonsWrapper {
  margin-top: 50px;
}
.buttonsWrapper .el-button {
  width: 200px;
  height: 50px;
  font-size: 20px;
}
</style>
