<template>
  <div class="home">
    <div>Hey, fellow geeks, nerds and other tech-savvy people, lets</div>
    <h1>Opensource your resume</h1>
    <p>
      <b>How does it works?</b>
      <ol>
        <li>You create separate repo named "gitresume" in your github account</li>
        <li>You add JSON file named "resume.json" here</li>
        <li>You fill this file with your resume data according to format</li>
        <li>You use this site to create Readme file, pdf/doc views of it</li>
        <li>You can paste link to your resume.json directly or to repo itself to allow it be more robot friendly</li>
      </ol>
    </p>
    <p><b>Why do you want to do this?</b></p>
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
      saved and easy to maintain and give link to, without relying to LinkedIn or other companies
    </p>
    <p>
      One more thing to consider, most resumes except ones for high-skilled professionals go through
      automatic parsing system. So special software parses your resume and extracts info from it to fit
      into inner company's CRM or other tracking software. Numberous problems arise here. From incorrect 
      parsing to wrong labeling to unsupported file formats (like some old parsers don't support pdf, 
      while support .doc files and everybody is required to send MSWord formatted resume).
    </p>
    <p>
      Idea of this opensource gitresume effort is to not only save resume on github, but to save it in
      machine readable format. JSON for now. So that you can paste link to it to any application you file 
      and have it easily parsed and eliminate parse errors.
    </p>
    <p>
      This service also allow to create eye-candy pdf/doc formatted resumes out of JSON one.
      You need to maintain only JSON resume following specific format.
    </p>
    <p>
      You can also use this service to edit resume without bothering with JSON if you want. 
      To ease things even more, you can have Readme file to reflect JSON resume in human-readable manner.
    </p>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
}
</script>
<style scoped>
  .home {
    margin: 100px;
    text-align: left;
  }
</style>
