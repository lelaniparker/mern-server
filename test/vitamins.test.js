// sets up test environment
process.env.NODE_ENV = 'test';

// variables from our code to set up the tests
const { mongoose } = require('../config/mongoose_connection');
const { app } = require("../app");
const vitaminModel = require("../models/product")

// getting the dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe('Vitamin Tests', () => {

    // setup mock vitamin product data
    const testVitaminProduct = new vitaminModel({
        productName: "Test Product",
        link: "http://test.com",
        vitaminInformation: [
            { name: "vitamin c", amount: "lots"},
            { name: "another one", amount: "not much"}
        ]
    })
    const testVitaminProduct2 = new vitaminModel({
        productName: "Another one",
        link: "http://test.com/2",
        vitaminInformation: [
            { name: "vitamin d", amount: "1mg"},
            { name: "vitamin x", amount: "2mg"}
        ]
    })

    // before the tests, add the test products to the test database
    before((done) => {
        vitaminModel.create(testVitaminProduct);
        vitaminModel.create(testVitaminProduct2);
        done();
    });

    // drop the collection after for fresh test environment every time you test
    after((done) => {
        mongoose.connection
        vitaminModel.deleteMany({}, function(err) {
        }).then(() => {
            mongoose.disconnect()
        })
        done();
    })

    // GET /data
    describe('/GET data', () => {
        it('should GET all vitamin products', (done) => {
            chai.request(app)
            .get("/data")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                res.body[0].productName.should.be.eql("Test Product");
                res.body[1].vitaminInformation[0].name.should.be.eql("vitamin d");
            })
        done();
        })
    })

    // GET for /data/:id
    describe('/GET for /data/:id, should get a single product', () => {
        it('should GET a single product', (done) => {
        const vitaminProduct = new vitaminModel({
            productName: "Cool Vitamins",
            link: "http://coolvitamins.com",
            vitaminInformation: [
                { name: "a real vitamin", amount: "2mg"}
            ]
        })
        vitaminProduct.save((err, product) => {
            chai.request(app)
                .get('/data/' + product.id)
                .send(product)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("productName");
                    res.body.should.have.property('_id').eql(vitaminProduct.id);
                    res.body.link.should.be.eql("http://coolvitamins.com")
            })
        })
        done();
    })})


    // TODO
//     post `/data/wishlist/:userId` addWishListItem
// - get `/data/wishlist/:userId` getProductsInWishlist
})