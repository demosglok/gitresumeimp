# gitresume

## Description

The idea is to have your resume opensourced in git-like repository (github, bitbucket, gitlab), easily readable by software (ATS) and maintainable by tech-savvy people directly or via software (this one should allow create/edit/view/export)

### Features
 - You don't depend on LinkedIn
 - Resume is easily parsable by ATS as it is in JSON
 - You can easily hide your resume making repo private
 - You can export it (in future iterations of development) into PDF or DOC formats according to template

### How to use
 - create repository "gitresume" and file "resume.json" under it
 - fill according to structure (see [[https://github.com/demosglok/gitresume/resume.json as example]])
 - use this tool to view, expor to pdf or doc and edit
 - this tool will also allow to create and edit repository and resume.json with UI but you'll need to allow access to github account

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
