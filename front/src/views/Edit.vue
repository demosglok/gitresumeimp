<template>
  <div class="wrapper">
    <h1>Edit your resume</h1>
    <div class="resume_editor">
      <el-row><el-col>
      <el-upload
        ref="uploader"
        class="custom-uploader"
        name="file"
        :action="uploadUrl"
        :with-credentials="true"
        :on-success="onUploadedFile"
      >
        <el-button  type="primary"> <i class="el-icon-upload"></i>Import Resume From File</el-button>
        <div slot="tip" class="el-upload__tip">docx/pdf files with a size less than 500kb</div>
      </el-upload>
      </el-col></el-row>
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
import config from '@/config';

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
  computed: {
    uploadUrl() {
      return `${config.BACKEND_URL}/parseresume`;
    },
    currentResume() {
      return this.$store.state.resume;
    }
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
      let saveResumePromise = null;
      if(this.$store.state.readme_resume) {
        saveResumePromise = this.$confirm('You have your README.md file in your account, do you want to overwrite it as well or save just JSON resume?', 'Warning', {
          confirmButtonText: 'Overwrite README.md',
          cancelButtonText: 'Save only resume.json',
          type: 'warning'
        })
        .then(() => this.$store.dispatch('saveResume', {resume, overwrite: true}))
        .catch(() => this.$store.dispatch('saveResume', {resume, overwrite: false}));
      } else {
        saveResumePromise = this.$store.dispatch('saveResume', {resume, overwrite: true});
      }
      saveResumePromise.then(saveResult => {
        if(!saveResult.error) {
          this.$message({type: 'success', message: 'Resume saved successfully, check your github account'});
        } else {
          this.$message({type: 'error', message: saveResult.error});
        }
      })
    },
    onUploadedFile(response) {
      console.log('uploaded', response);
      if(response.success) {
        // assign response to current resume
        this.$store.commit('setResume', response.resume);
        this.$refs.uploader.clearFiles();
      } else {
        this.$notify.error({
          title: "Error",
          message: response.error || "Error while uploading and processing"
        });
      }

    }
  },

  mounted() {
    const resume = this.$store.state.resume;
    if(resume) {
      this.name = resume.name;
      this.title = resume.title;
      this.description = resume.description;
      this.level = resume.level;
      if(resume.technologies) {
        resume.technologies.forEach(t => this.technologies.push(t));
      }
      if(resume.experience) {
        resume.experience.forEach(e => this.experience.push({...e}));
      }
      if(resume.education) {
        resume.education.forEach(e => this.education.push({...e}));
      }
    }
  },
  watch: {
    currentResume(resume) {
      if(resume) {
        this.name = resume.name;
        this.title = resume.title;
        this.description = resume.description;
        this.level = resume.level;
        if(resume.technologies) {
          this.technologies.splice(0,this.technologies.length)
          resume.technologies.forEach(t => this.technologies.push(t));
        }
        if(resume.experience) {
          console.log('updating experience', resume.experience);
          this.experience.splice(0,this.experience.length)
          resume.experience.forEach(e => this.experience.push({...e}));
        }
        if(resume.education) {
          this.education.splice(0,this.education.length)
          resume.education.forEach(e => this.education.push({...e}));
        }
      }
    }
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
