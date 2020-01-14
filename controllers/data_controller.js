const { getAllVitamins, getVitaminById, updateUserWishlist, getWishlistItems } = require("../utils/vitamin_utils")

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

const addWishlistItem = function (req, res) {
    updateUserWishlist(req).then((user) => {
        res.status(200);
        res.send(user)
    }).catch((err) => {
        res.status(500);
        res.send(`Error occurred adding product to wishlist: ${err}`)
    })
};

const getProductsInWishlist = function(req, res) {
    //calls getWishlistItems => returns product
}

module.exports = {
    getVitamins,
    getVitamin,
    addWishlistItem
}