const express = require("express")
const router = express.Router()
const { getProductsInWishlist, userAuthenticated } = require("../controllers/data_controller")
<<<<<<< HEAD
//const { getUserDashboard } = require("../")

// User Authenticated
router.use(userAuthenticated)

=======
const { getUser, updateUser } = require("../controllers/dashboard_controller")

// User Authenticated
router.use(userAuthenticated)
// READ 
// GET on '/:userId'
// Gets current user
router.get("/:userId", getUser)
>>>>>>> master
// Dashboard
// GET on user dashboard
//router.get("/dashboard/:userId")
// UPDATE on user dashboard
<<<<<<< HEAD
//router.update("/dashboard/:userId")
=======
router.put("/dashboard/:userId", updateUser)
>>>>>>> master
// DELETE on user dashboard
//router.delete("/dashboard/:userId")

// Wishlist
// GET on user wishlist
router.get("/wishlist/:userId", getProductsInWishlist)

module.exports = router