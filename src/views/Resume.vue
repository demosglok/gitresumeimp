<template>
  <div>
    <template v-if="resume">
      <el-row>
        <el-col :span="12">
          <resume-raw :resume="resume" />
        </el-col>
        <el-col :span="12">
          <resume-formatted :resume="resume" />
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <h1>You need to supply github login to see resume</h1>
      <el-input v-model="enteredlogin" placeholder="Enter github login" />
      <el-button type="primary" @click="loadresume">Load</el-button>
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
  props: ['githublogin'],
  computed: {
    resume() {
      return this.$store.state.resume;
    }
  },
  components: {
    ResumeRaw,
    ResumeFormatted
  },
  methods: {
    loadresume() {
      if(this.enteredlogin) {
        this.$store.dispatch('loadResume', this.enteredlogin).then(res => console.log('loaded', res));
      }
    }
  },
  mounted() {
    if(this.githublogin) {
      this.$store.dispatch('loadResume', this.githublogin).then(res => console.log('loaded', res));
    }
  }
}
</script>
