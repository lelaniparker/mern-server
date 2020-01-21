// sets up test environment
process.env.NODE_ENV = 'test';

const { mongoose } = require('../config/mongoose_connection')
const blogModel = require('../models/blog')
const { app } = require('../app')

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Blog Tests', () => {

    before(async (done) => {
        await mongoose.connection
            .dropCollection('Blog')
            .catch(err => console.log(err))
            .then(done())
    })


    // GET route
    describe('/GET blog', () => {
        it('it should GET all the blogposts', (done) => {
            chai.request(app)
                .get('/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
                });
        });
    });

    

    describe('/GET/post/:id ', () => {
        it('it should GET a post by the given id', (done) => {
            const post = {
                title: "Blog Title",
                username: "Test Smith",
                content: "This is the content" };

            blogModel.create((err, post) => {
                const dbPost = blogModel.find()
                chai.request(app)
                .get('/post/' + post._id)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('username');
                    res.body.should.have.property('content');
                    res.body.should.have.property('_id').eql(post.id);
                done();
                });
            });

        });
    });
});