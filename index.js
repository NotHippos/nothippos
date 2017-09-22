const express = require('express');
const parser = require('body-parser');
const router = require('./routes');
const path = require('path')
const db = require('./db/config');
var session = require('express-session');
const passport = require('passport'), 
FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./db/userSchema');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));



app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: 130245780952656,
    clientSecret: '267cc278534da649a7ea1f2ffacebebb',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
   	done(null, profile);
  }
));

passport.serializeUser(function(profile, done) {
  done(null, profile);
});

passport.deserializeUser(function(profile, done) {
  done(null, profile);
});





// app.use('/scripts', express.static('./node_modules'))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(require('express-session')({
  secret: 'travel'
}));

app.use('/api', router);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
    var sessData = req.session.passport;
  	res.redirect('/#/home')
  });

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const port = 3000;

app.listen(port, function() {
  console.log(`Server running, listening on ${port}...`);	
});














