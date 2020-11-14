const express = require('express');
const axios = require('axios');
var session = require('express-session');
var bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8080;

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'some secret salt azaza', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

passport.serializeUser(function(user, done) {
    console.log('serialize user', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('desserialize user', obj);
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `http://${process.env.SERVER_URL}/auth/github/callback`
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
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.get('/', (req, res) => {
    const user = req.session && req.session.passport && req.session.passport.user;
    console.log('req', user);
    res.json({msg: 'got it', user});
})

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
