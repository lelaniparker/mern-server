const express = require("express")
const router = express.Router()
const { getVitamins, getVitamin, addWishlistItem, getProductsInWishlist, userAuthenticated } = require("../controllers/data_controller")

// READ
// GET on '/posts'
// Returns all vitamins
router.get("/", getVitamins)

// READ
// GET on '/posts/:id'
// Returns vitamin with given id
router.get("/:id", getVitamin)
router.use(userAuthenticated)
// Wishlist
// POST on user wishlist
router.post("/wishlist/:userId", addWishlistItem)
// GET user wishlist
router.get("/wishlist/:userId", getProductsInWishlist)

module.exports = router