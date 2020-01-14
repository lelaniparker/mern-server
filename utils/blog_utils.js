const BlogPost = require("../models/blog.js")

// Core logic for blog post routes

const getAllPosts = function(req) {
	return BlogPost.find();
}

const getPostById = function(req) {
	return BlogPost.findById(req.params.id)
}

module.exports = {
	getAllPosts,
	getPostById
}