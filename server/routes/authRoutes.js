const passport = require('passport');

module.exports = app => {

    //when user comes to 'auth/google' attempt to authenticate user coming in on the route and use google
    //scope tells google servers what we are looking for: can find scopes that are provided by google
    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
            })
    );

    //Exchange code for actual user profile; put user on hold, take 'code' from the URL
    app.get('/auth/google/callback', passport.authenticate('google'));
};