let dataFile = "../data/vitamin_data.json"
let vitaminData = require(dataFile)
let blogFile = "../data/blog_posts.json"
let blogPosts = require(blogFile)

const getAllVitamins = function(req) {
	return vitaminData
}

const getVitaminById = function(req) {
	let vitamin = vitaminData[req.params.id]
	if (vitamin) return vitamin
	else req.error = "Post not found"
}

// Allows flexibility for testing
const setDataFile = function(fileName) {
	dataFile = fileName
	loadData()
}

// Loads data from dataFile
function loadData() {
	vitaminData = require(dataFile)
}

const getDataFileRelativeToApp = function(file) {
	// Remove the ../ from the dataFile path for writing
	// because the writeFile looks for path relative to the app, not utilities.js
	return file.substring(file.lastIndexOf("../") + 3, file.length)
}

// Core logic for blog post routes

const getAllPosts = function(req) {
	return filter(req.query)
}

const getPostById = function(req) {
	let post = blogPosts[req.params.id]
	if (post) return post
	else req.error = "Post not found"
}

// Allows flexibility for testing
const setBlogFile = function(fileName) {
	blogFile = fileName
	loadData()
}

// Loads data from dataFile
function loadBlog() {
	blogPosts = require(blogFile)
}

const getBlogFileRelativeToApp = function(file) {
	// Remove the ../ from the dataFile path for writing
	// because the writeFile looks for path relative to the app, not utilities.js
	return file.substring(file.lastIndexOf("../") + 3, file.length)
}

module.exports = {
	getAllVitamins,
	getVitaminById,
	setDataFile,
	getDataFileRelativeToApp,
	getAllPosts,
	getPostById,
	setBlogFile,
	loadBlog,
	getBlogFileRelativeToApp
}