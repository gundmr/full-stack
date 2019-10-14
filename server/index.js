const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

//take passport library and make use of GoogleStrategy 
// google strategy - has internal code can use 'google'
passport.use
    (new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' //route user is sent to after permision granted
    }, 

    //Store access token in DB
    (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
        }
    )
);

//when user comes to 'auth/google' attempt to authenticate user coming in on the route and use google
//scope tells google servers what we are looking for: can find scopes that are provided by google
app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
        })
);

//Exchange code for actual user profile; put user on hold, take 'code' from the URL
app.get('/auth/google/callback', passport.authenticate('google'));


// adding dynamic port for heroku deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT);
