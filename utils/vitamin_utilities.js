const Product = require('..models/product');

// Add product to wishlist
// returns a promise (because it is async)

const addWishlist = async function (req) {
    let product = await Product.findById(req.params.productId);

    let newWishlistItem = {
        username: req.body.username,
        wishlist: req.body.wishlist
    };
    wishlist.push(addWishList);
    return Product.findByIdAndUpdate(req.params.productId, product, {
        new: true
    });
}