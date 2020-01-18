const express = require("express")
const router = express.Router()
const { getProductsInWishlist, userAuthenticated } = require("../controllers/data_controller")
const { updateUser } = require("../controllers/dashboard_controller")

// User Authenticated
router.use(userAuthenticated)

// Dashboard
// GET on user dashboard
//router.get("/dashboard/:userId")
// UPDATE on user dashboard
router.put("/dashboard/:userId", updateUser)
// DELETE on user dashboard
//router.delete("/dashboard/:userId")

// Wishlist
// GET on user wishlist
router.get("/wishlist/:userId", getProductsInWishlist)

module.exports = router