const BlogPost = require("../models/blog.js")

// Core logic for blog post routes

// returns the blog posts from the database
const getAllPosts = function(req) {
	return BlogPost.find();
}

// returns a single blog post via the params
const getPostById = function(req) {
	return BlogPost.findById(req.params.id)
}

module.exports = {
	getAllPosts,
	getPostById
}