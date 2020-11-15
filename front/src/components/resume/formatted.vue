<template>
  <div class="formatted">
    <template v-if="resume.error">
      <b>Error in resume</b> {{resume.error}}
    </template>
    <template v-else>
      <h1>{{resume.name}}</h1>
      <h3>{{resume.title}}</h3>
      <p>{{resume.descirption}}</p>
      <hr/>
      <h5>Technologies</h5>
      <ul>
        <li v-for="tech in resume.technologies" :key="tech.name">{{tech.name}}</li>
      </ul>
      <hr/>
      <h5>Job history</h5>
      <div v-for="job in resume.job_history" :key="job.company">
        <div><b>{{job.company}}</b>: {{job.start_date}} - {{job.end_date ? job.end_date :'now'}}</div>
        <div>{{job.position}}</div>
      </div>
      <hr/>
      <h5>Education</h5>
      <div v-for="school in resume.education" :key="school.name">
        <div><b>{{school.name}}</b>: {{school.start_date}} - {{school.end_date}}</div>
        <div>Grad: {{school.graduation}}</div>
      </div>
      <hr/>
      <h5>Awards</h5>
      <div>{{resume.awards}}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ResumeFormatted',
  props: ["resume"]
}
</script>

<style scoped>
.formatted {
  text-align: left;
  padding: 20px;
}

</style>
