const mongoose = require('mongoose');
const { Schema } = mongoose; //takes away ability to have unknown in records

const userSchema = new Schema ({
    googleId: String, 
    points: Number, 
});

// telling mongoose we want to create a new collection called users: (name of collection, userSchema/const from new schema)
mongoose.model('users', userSchema);
