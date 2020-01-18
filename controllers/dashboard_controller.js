const { updateUserDetails } = require("../utils/dashboard_utils")

// const getVitamins = function (req, res) {
//     // execute the query from getAllPosts
//     getAllVitamins(req).exec((err, products) => {
//         console.log("products", products)
//         if (err) {
//             res.status(500);
//             res.json({
//                 error: err.message
//             });
//         }
//         res.send(products);
//     });
// };

// const getVitamin = function (req, res) {
//     // execute the query from getVitaminById
//     getVitaminById(req).exec((err, products) => {
//         if (err) {
//             res.status(404);
//             res.send("Post not found");
//         }
//         res.send(products);
//     });
// };

//Middleware to see if authenticated user is in session
const userAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
};

const updateUser = function (req, res) {
    // updates users details
    let user = updateUserDetails(req)
    if (user) {
        res.status(200)
        res.send(user)
    } else {
        res.status(500)
        res.send(`Error occured: ${req.error}`)
    }
};

// const updateUserEmail = function (req, res) {
//     // updates users email 
//     updateUserEmail(req).then((user) => {
//         res.status(200);
//         res.send(user)
//     }).catch((err) => {
//         res.status(500);
//         res.send(`Error occurred updating user's email: ${err}`)
//     })
// };

// const getProductsInWishlist = function (req, res) {
//     //calls getWishlistItems
//     getWishlistItems(req).then((product) => {
//         res.status(200);
//         res.send(product)
//     }).catch((err) => {
//         res.status(500);
//         res.send(`Error occurred getting product from wishlist: ${err}`)
//     })
// };



module.exports = {
    updateUser,
    //updateUserEmail,
    userAuthenticated
}