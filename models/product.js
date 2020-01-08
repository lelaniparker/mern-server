const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
    id: {
        type: String,
        productName: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        vitaminInformation: [{
            name: String, 
            required: true
        },
        {
            amount: String,
            required: true
        }]
    }
