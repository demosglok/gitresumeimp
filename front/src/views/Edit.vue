<template>
  <div class="wrapper">
    <h1>Edit your resume</h1>
    <div class="resume_editor">
      <el-row><el-col><el-button type="primary">Import existing from file</el-button></el-col></el-row>
      <el-row>
        <el-col :span="6"><b>Name</b></el-col>
        <el-col :span="18"><el-input v-model="name"/></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><b>Title</b></el-col>
        <el-col :span="18"><el-input v-model="title"/></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><b>Description</b></el-col>
        <el-col :span="18"><el-input type="textarea" v-model="description"/></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><b>Level</b></el-col>
        <el-col :span="18">
          <el-select  v-model="level" placeholder="Select Seniority Level">
            <el-option key="junior" label="Junior" value="Junior" />
            <el-option key="middle" label="Middle" value="Middle" />
            <el-option key="senior" label="Senior" value="Senior" />
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><b>Technologies</b></el-col>
        <el-col :span="18">
          <div v-for="(technology,idx) in technologies" :key="`tech_${idx}`"><el-input v-model="technologies[idx]" /></div>
          <el-button class="add_more" @click="addTechnology">Add more</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><b>Experience</b></el-col>
        <el-col :span="18">
          <div v-for="(item, idx) in experience" :key="`experience_${idx}`"><ExperienceEdit v-model="experience[idx]"/></div>
          <el-button class="add_more" @click="addExperience">Add more</el-button>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><b>Education</b></el-col>
        <el-col :span="18">
          <div v-for="(item, idx) in education" :key="`education_${idx}`"><EducationEdit v-model="education[idx]"/></div>
          <el-button class="add_more" @click="addEducation">Add more</el-button>
        </el-col>
      </el-row>
      <div class="buttonWrapper"><el-button type="success" @click="saveResume">Save</el-button></div>
    </div>
  </div>
</template>

<script>
import ExperienceEdit from '@/components/ExperienceEdit';
import EducationEdit from '@/components/EducationEdit';

export default {
  name: 'Edit',
  data() {
    return {

        name: '',
        title: '',
        description: '',
        level: null,
        technologies: [],
        experience: [],
        education: []

    }
  },
  components: {
    ExperienceEdit,
    EducationEdit
  },
  methods: {
    addTechnology() {
      this.technologies.push('');
    },
    addExperience() {
      this.experience.push({});

    },
    addEducation() {
      this.education.push({});
    },
    saveResume() {
      const resume = {
        name: this.name,
        title: this.title,
        description: this.description,
        level: this.level,
        technologies: this.technologies,
        experience: this.experience,
        education: this.education
      };
      console.log(JSON.parse(JSON.stringify(resume)));
      console.log('save resume', resume);
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .wrapper {
    margin: 100px 50px;
  }
  .resume_editor {
    padding: 30px;
    background-color: #f5f5f5;
    text-align: left;
  }
  .el-row {
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .buttonWrapper {
    margin: auto;
    text-align: center;
  }
</style>
