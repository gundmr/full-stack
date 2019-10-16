const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// one argument = fetch, two arguments = load something in
const User = mongoose.model('users');

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
        User.findOne({ googleId: profile.id}) //check if user exist in DB
            .then((existingUser) => {
                if(existingUser) {
                    //we already have a record with given profile ID
                    return done(null, existingUser);
                } else {
                    // we dont have a user with this ID make a new record
                    new User({ googleId: profile.id}).save(); //take model instance and save to DB
                }
            })
        }
    )
);
