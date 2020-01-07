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

})