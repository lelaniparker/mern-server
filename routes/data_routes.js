const express = require("express")
const router = express.Router()
const { getVitamins, getVitamin } = require("../controllers/data_controller")

// READ
// GET on '/posts'
// Returns all vitamins
router.get("/", getVitamins)

// READ
// GET on '/posts/:id'
// Returns vitamin with given id
router.get("/:id", getVitamin)

module.exports = router