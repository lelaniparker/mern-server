// let dataFile = "../data/vitamin_data.json"
// let vitaminData = require(dataFile)
// let blogFile = "../data/blog_posts.json"
// let blogPosts = require(blogFile)
const Product = require("../models/product.js")
const User = require("../models/user")

const getAllVitamins = function (req) {
	return Product.find();
}

const getVitaminById = function (req) {
	return Product.findById(req.params.id)
}

// Allows flexibility for testing
const setDataFile = function (fileName) {
	dataFile = fileName
	loadData()
}

// Loads data from dataFile
function loadData() {
	vitaminData = require(dataFile)
}

const getDataFileRelativeToApp = function (file) {
	// Remove the ../ from the dataFile path for writing
	// because the writeFile looks for path relative to the app, not utilities.js
	return file.substring(file.lastIndexOf("../") + 3, file.length)
}

// Add product to wishlist
// returns a promise (because it is async)

const updateUserWishlist = async function (req) {
	const userId = req.params.userId;
	let user = await User.findById(userId);

	user.wishlist.push(req.body.product);
	return User.findByIdAndUpdate(userId, user, {
		new: true
	});
}

const getWishlistItems = async function (req) {
	const userId = req.params.userId;
	let user = await User.findById(userId);
	let products = [];
	// Loop through all items in wishlist and get product data
	for (let productId of user.wishlist) {
		let product = await Product.findById(productId);
		products.push(product);
	}
	return products;
}

module.exports = {
	getAllVitamins,
	getVitaminById,
	setDataFile,
	getDataFileRelativeToApp,
	updateUserWishlist,
	getWishlistItems
}