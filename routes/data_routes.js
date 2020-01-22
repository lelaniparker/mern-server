const express = require("express")
const router = express.Router()
const {
    getVitamins,
    getVitamin,
    addWishlistItem,
    getProductsInWishlist,
    userAuthenticated
} = require("../controllers/data_controller")

// GET on '/data'
// Returns all vitamins
router.get("/", getVitamins)

// GET on '/data/:id'
// Returns vitamin with given id
router.get("/:id", getVitamin)

//
router.use(userAuthenticated)

// Wishlist
// POST on user wishlist
router.post("/wishlist/:userId", addWishlistItem)

// GET user wishlist
router.get("/wishlist/:userId", getProductsInWishlist)

module.exports = router