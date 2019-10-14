const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

//take passport library and make use of GoogleStrategy
passport.use(new GoogleStrategy());


// adding dynamic port for heroku deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT);
