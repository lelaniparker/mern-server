// use the test database
process.env.NODE_ENV = 'test';

// import files needed for tests
const { mongoose } = require('../config/mongoose_connection');
const { app } = require('../app');
const userModel = require('../models/user');

// import testing dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

// start the tests for the user
describe('User Tests', () => {
    // setup a mock user for the test database
    const testUser = new userModel({
        username: "Arthur Dent",
        email: "arthur@email.com",
        wishlist: []
    })

    // before tests run, add mock user to the test database
    before((done) => {
        userModel.create(testUser);
        done();
    })

    // after tests run, drop the collection from the database for a fresh database every time the tests run. Also, close the mongoose connection
    after((done) => {
        mongoose.connection
        userModel.deleteMany({}, function(err) {
        }).then(() => {
            mongoose.disconnect()
        })
        done();
    })

    // Get a user
    describe('/GET /users/:id for a single user', () => {
        it('should GET a single user, given a user id', (done) => {
            // set up mock user for test
            const fakeUser = new userModel({
                username: "Zaphod Beeblebrox",
                email: "test@email.com",
                wishlist: []
            });

            // save user to the database, then make a get request using chai and the id from the user from the database
            fakeUser.save((err, user) => {
                // using chai and our server
                chai.request(app)
                    .get('/user/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.be.eql(1);
                        res.body.should.be.a('object');
                        res.body.should.have.property('email');
                        res.body.should.have.property('username');
                        res.body.should.have.property('_id').eql(user.id);
                        res.body.username.should.be.eql('Zaphod Beeblebrox');
                })
            })
        done();
        })
    })

    // Update a user
    describe('/PUT /users/:id to update a single user', () => {
        it('should update a single user', (done) => {
            // set up the user for the test
            const mockUser = new userModel({
                username: "Ford Prefect",
                email: "test@email.com",
                wishlist: []
            });

            // save to the database, get the id for it, and then update the record
            mockUser.save((err, user) => {
                // first let's check that we can GET it
                chai.request(app)
                    .get('/users' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.email.should.be.eq("test@email.com");
                    })

                // let's update the entry with a new email
                const updateUser = {
                    username: "Ford Prefect",
                    email: "newemail@gmail.com",
                    wishlist: []
                };

                // make a put request
                chai.request(app)
                    .put('/users' + user.id)
                    .send(updateUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql("You've updated your details!");
                        res.body.user.should.have.property('username');
                        res.body.user.email.should.be.eql("newemail@gmail.com");
                    })

            })
            done();
        })
    })
})