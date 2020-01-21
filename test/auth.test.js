// use the test database, not our main database
process.env.NODE_ENV = 'test';

// import files needed for the tests
const { mongoose } = require("../config/mongoose_connection");
const { app } = require('../app');
const userModel = require('../models/user');

// import testing dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Auth Tests', () => {
    // Set up a user to register and play with
    const registeringUser = {
        username: "MalcolmReynolds",
        email: "stolen_cargo@email.com",
        password: "very_strong123"
    }

    // before the tests, logout any user
    before(done => {
        chai.request(app)
            .get("/auth/logout")
        done();
    })

    // after the tests run, drop the collection for a clean test database
    after(done => {
        mongoose.connection
        userModel.deleteMany({}, (err) => {
        }).then(() => {
            mongoose.disconnect()
        })
        done();
    })

    // register a user
    describe('/POST /auth/register', () => {
        it('should register a new user', (done) => {
            // make a post request to register user
            chai.request(app)
                .post("/auth/register")
                .send(registeringUser)
                .end((err, res) => {
                    res.should.have.status(200);
                })
            done()
        })
    })

    // login a user
    describe('/POST /auth/login', () => {
        it('should login a user', (done) => {
            // user details to login
            const loggingInUser = {
                username: "MalcolmReynolds",
                password: "very_strong123"
            }

            // make post request to login the user
            chai.request(app)
                .post("/auth/login")
                .send(loggingInUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.user.username.should.be.eql("MalcolmReynolds")
                })
            done();
        })
    })

    // logout a user
    describe('/GET /auth/logout', () => {
        it('should logout the user', (done) => {
            chai.request(app)
                .get("/auth/logout")
                .end((err, res) => {
                    res.should.have.status(200)
                })
            done();
        })

         it('should not log in with bad credentials', (done) => {
            // bad credentials
            const badLogin = {
                username: "Jayne_Cobb",
                password: "password123"
            }

            // make post request to login the user
            chai.request(app)
                .post("/auth/login")
                .send(badLogin)
                .end((err, res) => {
                    res.should.have.status(401)
                })
            done();
        })
    })
})