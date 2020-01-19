// const { getUserById, updateUserDetails } = require("../utils/dashboard_utils")
const User = require("../models/user")

// get user
// const getUser = function (req, res) {
//     let username = User[req.params.username]
//     //let userEmail = User[req.params.email]
//     if (username) {
//         res.send('This is your current username: ' + username)
//     } else {
//         res.status(404)
//         res.send(req.error)
//     }
// }

const displayUser = function (req, res) {
    try {
        const userId = req.params.userId;
        let user = await User.findById(userId);
        if (!user[userId]) throw "User not found"
        user[userId].name = req.body.username
        user[userId].email = req.body.email
        return user[userId]
    } catch (error) {
        req.error = error
        return null
    }
};

// // Update User Details
// // returns a promise (because it is async)
// const updateUserDetails = function (req) {
//     try {
//         const userId = req.params.userId;
//         let user = await User.findById(userId);
//         if (!user[userId]) throw "User not found"
//         user[userId].name = req.body.username
//         user[userId].email = req.body.email
//         return user[userId]
//     } catch (error) {
//         req.error = error
//         return null
//     }
// }



module.exports = {
    displayUser
};

// // const getVitamins = function (req, res) {
// //     // execute the query from getAllPosts
// //     getAllVitamins(req).exec((err, products) => {
// //         console.log("products", products)
// //         if (err) {
// //             res.status(500);
// //             res.json({
// //                 error: err.message
// //             });
// //         }
// //         res.send(products);
// //     });
// // };

// // const getVitamin = function (req, res) {
// //     // execute the query from getVitaminById
// //     getVitaminById(req).exec((err, products) => {
// //         if (err) {
// //             res.status(404);
// //             res.send("Post not found");
// //         }
// //         res.send(products);
// //     });
// // };

// //Middleware to see if authenticated user is in session
// const userAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// };

// const getUser = function(req, res) {
//     let user = getUserById(req)
//     if (user) res.send(user)
//     else {
//         res.status(404)
//         res.send(req.error)
//     }
// }

// const updateUser = function (req, res) {
//     // updates users details
//     let user = updateUserDetails(req)
//     if (user) {
//         res.status(200)
//         res.send(user)
//     } else {
//         res.status(500)
//         res.send(`Error occured: ${req.error}`)
//     }
// };

// // const updateUserEmail = function (req, res) {
// //     // updates users email 
// //     updateUserEmail(req).then((user) => {
// //         res.status(200);
// //         res.send(user)
// //     }).catch((err) => {
// //         res.status(500);
// //         res.send(`Error occurred updating user's email: ${err}`)
// //     })
// // };

// // const getProductsInWishlist = function (req, res) {
// //     //calls getWishlistItems
// //     getWishlistItems(req).then((product) => {
// //         res.status(200);
// //         res.send(product)
// //     }).catch((err) => {
// //         res.status(500);
// //         res.send(`Error occurred getting product from wishlist: ${err}`)
// //     })
// // };



// module.exports = {
//     updateUser,
//     getUser,
//     //updateUserEmail,
//     userAuthenticated
// }