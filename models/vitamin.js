const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vitamin = new Schema({
    vitamin_name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    vitamin_content: [{
        type: String, 
        required: true
    }]
})