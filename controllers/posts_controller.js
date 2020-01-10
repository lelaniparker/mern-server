const { getAllPosts, getPostById } = require("../utils/utilities")

const getPosts = function(req, res) {
	res.send(getAllPosts(req))
}

const getPost = function(req, res) {
	let post = getPostById(req)
	if (post) res.send(post)
	else {
		res.status(404)
		res.send(req.error)
	}
}

module.exports = {
	getPosts,
	getPost,
	getAllPosts
}