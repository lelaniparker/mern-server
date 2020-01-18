//const Product = require("../models/product.js")
const User = require("../models/user")

// Allows flexibility for testing
// const setDataFile = function (fileName) {
// 	dataFile = fileName
// 	loadData()
// }

// Add product to wishlist
// returns a promise (because it is async)
const getUserDashboard = async function (req) {
	const userId = req.params.userId;
	let user = await User.findById(userId);
	//let userDetails = {};
	// Loop through all items in wishlist and get product data
	// for (let productId of user.wishlist) {
	// 	let product = await Product.findById(productId);
	// 	products.push(product);
	// }
	return userDetails;
}

module.exports = {
	getAllVitamins,
	getVitaminById,
	setDataFile,
	getDataFileRelativeToApp,
	updateUserWishlist,
	getWishlistItems
}