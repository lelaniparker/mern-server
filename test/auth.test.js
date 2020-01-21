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

    // after the tests run, drop the collection for a clean test database
    after(done => {
        mongoose.connection
        userModel.deleteMany({}, (err) => {
        }).then(() => {
            mongoose.disconnect()
        })
        done();
    })

    //
})