const { getAllVitamins, getVitaminById, updateUserWishlist, getWishlistItems } = require("../utils/vitamin_utils")

// Controller for accessing the product data

// function gets all the products
const getVitamins = function (req, res) {
    // execute the query from getAllPosts
    getAllVitamins(req).exec((err, products) => {
        console.log("products", products)
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.send(products);
    });
};

// function to return a single product
const getVitamin = function (req, res) {
    // execute the query from getVitaminById
    getVitaminById(req).exec((err, products) => {
        if (err) {
            res.status(404);
            res.send("Post not found");
        }
        res.send(products);
    });
};

// Middleware to see if authenticated user is in session
const userAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
};

// Adds item to wishlist
const addWishlistItem = function (req, res) {
    // saves wishlist item
    updateUserWishlist(req).then((user) => {
        res.status(200);
        res.send(user)
    }).catch((err) => {
        res.status(500);
        res.send(`Error occurred adding product to wishlist: ${err}`)
    })
};

// gets all products in a user's wishlist
const getProductsInWishlist = function (req, res) {
    //calls getWishlistItems
    getWishlistItems(req).then((product) => {
        res.status(200);
        res.send(product)
    }).catch((err) => {
        res.status(500);
        res.send(`Error occurred getting product from wishlist: ${err}`)
    })
};



module.exports = {
    getVitamins,
    getVitamin,
    addWishlistItem,
    getProductsInWishlist,
    userAuthenticated
}