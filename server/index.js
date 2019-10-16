const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
//const config = require('config');
require('./models/User');
require('./services/passport'); //becuase there is nothing to config we can just 'require'


//mongoose.connect(keys.mongoURI, { useUnifiedTopology: true });

// MongoDB URI - need this to connect too
const db = keys.mongoURI;


// CONNECT to mongo
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



const app = express();

//require statement returns function in authRoutes
require('./routes/authRoutes')(app);

// adding dynamic port for heroku deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT);
