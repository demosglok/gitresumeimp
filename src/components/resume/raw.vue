<template>
  <div class="raw">
      <VueJsonPretty :data="raw" />
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'ResumeRaw',
  props: ["resume"],
  computed: {
    raw() {
      return this.resume;
    }
  },
  components: {
    VueJsonPretty
  }
}
</script>

<style scoped>
 .raw {
   text-align: left;
   padding: 20px;
   border: 1px solid #ccc;
 }

</style>