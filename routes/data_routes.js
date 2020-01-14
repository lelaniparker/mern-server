const express = require("express")
const router = express.Router()
const { getVitamins, getVitamin, addWishlistItem, getWishlistItems } = require("../controllers/data_controller")

// READ
// GET on '/posts'
// Returns all vitamins
router.get("/", getVitamins)

// READ
// GET on '/posts/:id'
// Returns vitamin with given id
router.get("/:id", getVitamin)

router.post("/wishlist/:userId", addWishlistItem)
router.get("/wishlist/:userId", getWishlistItems)

module.exports = router