const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

// plugin the passport-local-mongoose middleware with our User schema 
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User)