const express = require("express")
const router = express.Router()
const { getProductsInWishlist, userAuthenticated } = require("../controllers/data_controller")
//const { getUserDashboard } = require("../")

// User Authenticated
router.use(userAuthenticated)

// Dashboard
// GET on user dashboard
//router.get("/dashboard/:userId")
// UPDATE on user dashboard
//router.update("/dashboard/:userId")
// DELETE on user dashboard
//router.delete("/dashboard/:userId")

// Wishlist
// GET on user wishlist
router.get("/wishlist/:userId", getProductsInWishlist)

module.exports = router