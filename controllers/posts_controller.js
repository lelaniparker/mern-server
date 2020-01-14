const { getAllPosts, getPostById } = require("../utils/blog_utils")

const getPosts = function(req, res) {
	// execute the query from getAllPosts
    getAllPosts(req).exec((err, posts) => {
        console.log("products", posts)
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.send(posts);
    });
}

const getPost = function(req, res) {
	// execute the query from getPostById
	getPostById(req).exec((err, post) => {
		if (err) {
			res.status(404);
			res.send("Post not found");
		}
		res.send(post);
	});
}

module.exports = {
	getPosts,
	getPost
}