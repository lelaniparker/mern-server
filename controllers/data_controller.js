const { getAllVitamins, getVitaminById } = require("../utils/utilities")

const getVitamins = function(req, res) {
	res.send(getAllVitamins(req))
}

const getVitamin = function(req, res) {
	let post = getVitaminById(req)
	if (post) res.send(post)
	else {
		res.status(404)
		res.send(req.error)
	}
}

module.exports = {
	getVitamins,
	getVitamin
}