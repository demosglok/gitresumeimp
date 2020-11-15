const express = require('express');
const cors = require('cors');
const axios = require('axios');
var session = require('express-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

require('dotenv').config();

const port = process.env.PORT || 8081;
console.log('env port', process.env.PORT);

const GITHUB_API = 'https://api.github.com';

const app = express();
app.use(cors({ credentials: true, origin: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'some secret salt azaza', resave: true, saveUninitialized: true, cookie: { maxAge: 1209600000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/auth/github/callback`
  },
  function(accessToken, refreshToken, profile, done) {
      const userdata = {id: profile.id, nodeId: profile.nodeId, displayName: profile.displayName, username: profile.username, token: accessToken};
      console.log('auth done', userdata);
      done(null, userdata);
  }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email', 'public_repo' ] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:8080/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.get('/', (req, res) => {
  res.redirect('http://localhost:8080')
});
app.get('/getuser', (req, res) => {
  if(req.user) {
    res.json(req.user);
  } else {
    res.json({error: 'no_user', message: 'User is not logged in'})
  }
})

function getJsonAndReadmeResumes(username, token) {
  return Promise.all([
        axios.get(`${GITHUB_API}/repos/${username}/${username}/contents/resume.json`,{
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
          }
        }).then(response => response.data).catch(ex => ({error: ex.message, data: ex.response && ex.response.data})),
        axios.get(`${GITHUB_API}/repos/${username}/${username}/contents/README.md`,{
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`
          }
        }).then(response => response.data).catch(ex => ({error: ex.message, data: ex.response && ex.response.data})),
      ]);
}
app.get('/getresume', async (req, res) => {
  const user = req.user;
  if(user) {
    try {
      const response = await axios.get(`${GITHUB_API}/repos/${user.username}/${user.username}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${user.token}`
        }
      });

      const resumes = (await getJsonAndReadmeResumes(user.username, user.token))
        .map(r => r.content ? Buffer.from(r.content, 'base64').toString() : r);
      if(!resumes[0].error) {
        resumes[0] = JSON.parse(resumes[0]);
      }
      res.json(resumes);

    } catch(ex) {
      console.log('error getting resume', ex.message, ex.response && ex.response.data);
      res.json({error: ex.message, data: ex.response && ex.response.data});
    }
  } else {
    res.json({error: 'no_user', message: 'User is not logged in'});
  }
});

function prepareReadme(resume) {
  const technologiesStr = resume.technologies && resume.technologies.join(', ');
  const experienceStr = resume.experience && resume.experience.map(e => `###${e.company}\n\n${e.start_date} - ${e.end_date}\n\n**${e.position}**\n\n${e.description||''}\n\n`).join("\n----\n");
  const educationStr = resume.education && resume.education.map(e => `###${e.school}\n\n${e.start_date} - ${e.end_date}\n\n**${e.degree}**\n\n${e.description||''}\n\n`).join("\n----\n")
  return `## ${resume.name||''}\n
### ${resume.title||''}\n
${resume.description||''}\n
Level: ${resume.level||''}\n\n
Technologies: ${technologiesStr || ''}\n\n
**Experience**: \n
${experienceStr || ''}\n\n
====\n
**Education**\n\n
${educationStr||''}\n

JSON: https://github.com/demosglok\n
   `;
}
app.post('/saveresume', async (req, res) => {
    const {resume, overwrite} = req.body;
    const user = req.user;
    let error = null;
    try {
    const response = await axios.post(`${GITHUB_API}/user/repos`,
      {
        name: user.username,
        description: 'Repository for showing human readable resume on account and also hold machine-readable resume in json format',
        private: false
      },
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${user.token}`
        }
      });

       console.log(' creation result', response.data);

    } catch(ex) {
        console.log('error', ex.message, ex.response && ex.response.data);
        error = {message: ex.message, data: ex.response && ex.response.data};
    }
    const alreadyExists = error && error.data && error.data.errors && error.data.errors.some(err => err.message == 'name already exists on this account');
    if(alreadyExists) {
      console.log('repo already exists');
    }
    if(!error || alreadyExists) {
      try {
        error = null;
        const [existingJson, existingReadme] = await getJsonAndReadmeResumes(user.username, user.token);
        const jsonresult = await axios.put(`${GITHUB_API}/repos/${user.username}/${user.username}/contents/resume.json`,
          {
            message: 'testing creation of readme',
            content: Buffer.from(JSON.stringify(resume)).toString('base64'),
            sha: existingJson.sha ? existingJson.sha : undefined
          },
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: `token ${user.token}`
            }
          });

        if(overwrite) {
          const readmeContent = prepareReadme(resume);
          const readmeresult = await axios.put(`${GITHUB_API}/repos/${user.username}/${user.username}/contents/README.md`,
            {
              message: 'storing README.md with resume '+Date.now(),
              content: Buffer.from(readmeContent).toString('base64'),
              sha: existingReadme.sha ? existingReadme.sha : undefined
            },
            {
              headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${user.token}`
              }
            });
        }
      } catch (ex) {
          console.log('error', ex.message, ex.response && ex.response.data);
          error = {message: ex.message, data: ex.response && ex.response.data};
      }
    }
    if(!error) {
        res.json({success: true});
    } else {
      res.json({error});
    }
})

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
