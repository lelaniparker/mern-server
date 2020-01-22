const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for a Vitamin Product
const Product = new Schema({
    productName: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    vitaminInformation: [
        {
            name: String,
            amount: String
        }
    ]
},
    {collection: 'vitamins'}
)

module.exports = mongoose.model("Product", Product)