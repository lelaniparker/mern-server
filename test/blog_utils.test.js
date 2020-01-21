// // set the environment to test mode
// process.env.NODE_ENV = 'test';

// const { mongoose } = require("../config/mongoose_connection");
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const should = chai.should();
// const blogModel = require("../models/blog")
// const { getAllPosts } = require("../utils/blog_utils")

// chai.use(chaiHttp);

//         const testBlogPost = new blogModel({
//             title: "Test Title",
//             create_date: "01/01/2020",
//             modified_date: "02/01/2020",
//             username: "Test User",
//             content: "Test content here",
//             category: "Test Category"
//         })

// describe('Blog Utils Tests', () => {
//     // before((done) => {
//     //     blogModel.create(testBlogPost)
//     //     done();
//     // })

//     after((done) => {
//         mongoose.connection
//             .dropCollection('Blog')
//             .catch(err => console.log(err))
//             .then(done())
//     })

//     describe('getAllPosts with one post', () => {
//         it('should get one post', (done) => {
//           const allPosts = getAllPosts(testBlogPost);
//           console.log(allPosts)
//           allPosts.products.length.should.be.eql(1);
//         })
//     })
// })


// describe("getAllPosts with one post", () => {
// 	it("should get a post if one exists", () => {
// 		// Pass an empty req object
// 		expect(Object.keys(utilities.getAllPosts({})).length).toBe(1)
// 	})
// 	it("user of first post should be tester", () => {
// 		expect(utilities.getAllPosts({})["1"].username).toBe("tester")
// 	})
// })

// describe("getPostById", () => {
// 	// Define a req object with the expected structure to pass a parameter
// 	const req = {
// 		params: {
// 			id: "1"
// 		}
// 	}
// 	it("user of post with id 1 should be tester", () => {
// 		expect(utilities.getPostById(req).username).toBe("tester")
// 	})
// })

// // Setup and tear down functions
// function setupData() {
// 	let testPostData = {}
// 	let testPost = {}
// 	let date = Date.now()
// 	testPost.title = "Test post 1"
// 	testPost.username = "tester"
// 	testPost.create_date = date
// 	testPost.modified_date = date
// 	testPost.content = "This is the first test post"
// 	testPost.category = ""
// 	testPostData["1"] = testPost

// 	fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
// 	utilities.setDataFile(testDataFile)
// }

// function tearDownData() {
// 	let testPostData = {}
// 	fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
// }