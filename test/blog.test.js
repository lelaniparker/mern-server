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
        }).then(() => {
            mongoose.disconnect()
        })
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
                    res.body[0].title.should.be.eql("Test Title");
                done();
                });
        });
    });

    // GET route for /posts/:id
    describe('/GET/ posts/:id single blog post', () => {
        it('should GET a blog post by the given id', (done) => {
            const newPost = new blogModel({
                title: "Vampires are real",
                create_date: "01/01/2020",
                modified_date: "02/01/2020",
                username: "Buffy Summers",
                content: "Vampires are not sparkly",
                category: "life"
            });
            newPost.save((err, blogPost) => {
                chai.request(app)
                    .get('/posts/' + blogPost.id)
                    .send(blogPost)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('username');
                        res.body.should.have.property('content');
                        res.body.should.have.property('category');
                        res.body.should.have.property('_id').eql(blogPost.id);
                        res.body.username.should.be.eql("Buffy Summers");
                done();
                });

            });

        })
    })
})