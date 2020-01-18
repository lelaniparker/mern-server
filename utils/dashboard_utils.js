//const Product = require("../models/product.js")
const User = require("../models/user")

// Allows flexibility for testing
// const setDataFile = function (fileName) {
//     dataFile = fileName
//     loadData()
// }

// // Loads data from dataFile
// function loadData() {
//     vitaminData = require(dataFile)
// }

// const getDataFileRelativeToApp = function (file) {
//     // Remove the ../ from the dataFile path for writing
//     // because the writeFile looks for path relative to the app, not utilities.js
//     return file.substring(file.lastIndexOf("../") + 3, file.length)
// }

// Get Users details
// const getUserDetails = async function (req) {
//     const userId = req.params.userId;
//     let user = await User.findById(userId);
//     let products = [];
//     // Loop through all items in wishlist and get product data
//     for (let productId of user.wishlist) {
//         let product = await Product.findById(productId);
//         products.push(product);
//     }
//     return products;
// }



// Gets users details
const getUserById = function (req) {
    const userId = req.params.userId;
    let user = User.findById(userId);
    if (user) return user
    else req.error = "User not found"
}


// Update User Details
// returns a promise (because it is async)
const updateUserDetails = function (req) {
    try {
        const userId = req.params.userId;
        let user = User.findById(userId);
        if (!user[userId]) throw "User not found"
        user[userId].name = req.body.username
        user[userId].email = req.body.email
        return user[userId]
    } catch (error) {
        req.error = error
        return null
    }
}

// const updateUserEmail = async function (req) {
//     const userId = req.params.userId;
//     let user = await User.findById(userId);

//     user.email(req.body.email);
//     return User.findByIdAndUpdate(userId, user, {
//         new: true
//     });
// }

module.exports = {
    getUserById,
    updateUserDetails,
    //updateUserEmail
    //getWishlistItems
}