const Product = require("../models/product.js")
const User = require("../models/user")

// logic to return information from the database to do with products/vitamins

// returns all products from database
const getAllVitamins = function (req) {
	return Product.find();
}

// returns a product via it's id
const getVitaminById = function (req) {
	return Product.findById(req.params.id)
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

// gets the products in a wishlist from the database
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