const express = require("express")
const router = express.Router()
const { getPost, getPosts } = require("../controllers/posts_controller")

// GET on '/posts'
// Returns all posts
router.get("/", getPosts)

// GET on '/posts/:id'
// Returns post with given id
router.get("/:id", getPost)

module.exports = router