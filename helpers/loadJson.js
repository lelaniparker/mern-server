const mongoose = require("mongoose");
const assert = require("assert");
const Product = require("../models/product");
const products = require("../data/vitaminProducts.json");

// helper function used to seed the local database
moongoose.connect('mongodb://localhost/analyzeVit');

const db = mongoose.connection;

const importProducts = () => {
    Product.collection.insertMany(products, (err, res) => {
        assert.equal(null, err);
        assert.equal(4, res.insertedCount);
        db.close();
    });
    console.log(`Products data imported successfully ${Product.find()}`);
}

importProducts();