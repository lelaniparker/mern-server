// sets up test environment
process.env.NODE_ENV = 'test';

const { mongoose } = require('../config/mongoose_connection')
const { app } = require('../app')
const blogModel = require('../models/blog')

//Require the dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Blog Tests', () => {

    // setup test blog post
    const testBlogPost = new blogModel({
            title: "Test Title",
            create_date: "01/01/2020",
            modified_date: "02/01/2020",
            username: "Test User",
            content: "Test content here",
            category: "Test Category"
    })

    // before the tests run, add the blog post to the test database
    before((done) => {
        blogModel.create(testBlogPost);
        done();
    })

    // dropping the Blog collection in the test database for a fresh test environment after it has run the tests
    after( (done) => {
        mongoose.connection
        blogModel.deleteMany({}, function(err) {
        });
            done();
    })


    // GET route
    describe('/GET blog', () => {
        it('should GET all the blogposts', (done) => {
            chai.request(app)
                .get('/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();
                });
        });
    });
});