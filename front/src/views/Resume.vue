<template>
  <div>
      <el-row>
        <el-col :span="12">
          <resume-raw :resume="resume" />
        </el-col>
        <el-col :span="12">
          <resume-formatted :resume="resume" />
        </el-col>
      </el-row>
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
    }
  },
  components: {
    ResumeRaw,
    ResumeFormatted
  },
  methods: {

  },
  mounted() {
    if(!this.$store.state.resume) {
      this.$store.dispatch('loadResume').then(res => console.log('loaded', res));
    }
  }
}
</script>
