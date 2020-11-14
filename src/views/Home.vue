<template>
  <div class="home">
    <div class="first_screen">
      <div class="first_screen_content">
        <h3>Hey fellow geeks and tech-savvy people, lets</h3>
        <h1>Opensource Your Resume</h1>
        <h3> Create your Opensource and Robot-friendly resume right in your github</h3>
        <button class="start_btn" @click="start_click"><img src="~@/assets/Octocat.png" />Start with github</button>
        <div class="know_more"><a href="#how_it_works">How does it work ⇩</a></div>
      </div>
    </div>
    <hr/>
    <div class="details">
      <div>
        <h2 id="how_it_works">How does it work?</h2>
        <div class="explanation_boxes">
          <div class="explanation_box">
            <div class="explanation_box_number">1</div>
            <h4>Import or create resume</h4>
            <div>
              Import your existing resume from pdf file or any other file. Or create one from scratch
            </div>
          </div>
          <div class="explanation_box">
            <div class="explanation_box_number">2</div>
            <h4>Special git repository</h4>
            <div>Special public repository is created on your behalf in your account under name same as you account.
            This repository will contain single json file with your resume in machine-readable format and
            single <b>Readme</b> file with your resume in Human-Readable format</div>
          </div>
          <div class="explanation_box">
            <div class="explanation_box_number">3</div>
            <h4>Export or give a link</h4>
            <div>When you need to present your resume, you can give direct link to git account which will allow to parse resume
            automatically or ready manually. You can also use this site to export it in pdf format like linkedin profile</div>
          </div>
          <div class="explanation_box">
            <div class="explanation_box_number">4</div>
            <h4>Update it as you need</h4>
            <div>Use this tool to update your resume as necessary. Both json machine-readable and Readme humab-readable versions will be upated</div>
          </div>
        </div>
      </div>
      <div>
      <h2>Wait but Why?</h2>
        <b>Why should I care</b>
        <p>
          We all used to have resume stored somewhere. Most people have one or several options like
          <ul>
            <li>Having plain doc/pdf file on their hard-drive and update this file from time to time</li>
            <li>Having google-doc or other online doc and send link to HR people when applying somewhere</li>
            <li>Having LinkedIn account with all data stored there</li>
          </ul>
        </p>
        <p>
          If you're programmer, you must have used git a lot. Why not to use it for resume? Having all history
          saved and easy to maintain and give link to, without relying to LinkedIn or places.
        </p>
        <p>
          Especially as github allows it now via this secret gem
          <a href="https://medium.com/@imrajeshberwal/turning-github-profile-into-resume-with-readme-64215abbe765">https://medium.com/@imrajeshberwal/turning-github-profile-into-resume-with-readme-64215abbe765
          </a>
        </p>
        <p>
          One more important thing to consider. Most resumes go through applicant tracking systems or other species of robots, parsing it.
          Software for parsing is very sophisticated and does a great job, but why not to make life of robots easier and make first ROBOT FRIENDLY resume?
          So that software will never miss any important part of your resume because of ms-word glitch in format or AI mixed your skill with your school.
        </p>
        <p>
          Idea of this opensource gitresume effort is to not only save resume on github, but to save it in
          machine readable format. JSON for now. So that you can paste link to it to any application you file
          and have it easily parsed and eliminate parse errors.
        </p>
      </div>
      <div>
        <h2>What else?</h2>
        <p>
          This service also allow to create eye-candy pdf/doc formatted resumes out of JSON one.
          You need to maintain only JSON resume following specific format.
        </p>
        <p>
          You can also use this service to edit resume without bothering with JSON if you want.
          To ease things even more, you can have Readme file to reflect JSON resume in human-readable manner.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    start_click() {
      console.log('start click');
    }
  }
}
</script>
<style scoped>
  .home {
    text-align: left;
  }
  .first_screen {
    padding-top: 150px;
    width: 100%;
    height: 100vh;
    background: url(~@/assets/background.jpg) center center;
    background-size: cover;
    position: relative;
    z-index: 0;
  }
  .first_screen:after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(#000000, #040c14 70%, transparent);
    opacity: 0.9;

    z-index: 1;
    top: 0;
    left: 0;
  }
  .first_screen_content {
    color: #d0d0d0;
    position: relative;
    z-index: 3;
    padding-top: 150px;
  }
  h1, h3 {
    text-align: center;
  }
  h3 {
    font-size: 25px;
  }
  h1 {
    font-size: 45px;
    margin-block-start: 1.5em;
    margin-block-end: 1.5em;
  }

  .start_btn {
    border: none;
    outline: none;
    background: limegreen;
    color: white;
    font-weight: bold;
    display: block;
    margin: auto;
    margin-top: 50px;
    width: 300px;
    height: 50px;
    font-size: 30px;
    border-radius: 3px;
    border: 1px solid white;
  }
  .start_btn img {
    height: 30px;
    vertical-align: text-bottom;
  }
  .know_more {
    text-align: center;
    margin-top: 50px;
  }
  .know_more a {
    font-size: 20px;
    color: #ccccff;
  }
  .details {
    padding: 10px 50px;
  }
  .explanation_boxes {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .explanation_box {
    width: 20%;
    height: 300px;
    border: 1px solid #242c34;
    padding: 15px;
  }
  .explanation_box_number {
    display: block;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 1px solid #242c34;
    color: #509050;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
</style>
