// sets the environment to test, to use the test database
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// getting our app and mongoose
const { app } = require('../app')
const { mongoose } = require('../config/mongoose_connection')

const { expect } = chai

describe('Mongoose connection Tests', function() {
	describe('test vs development database connection', function() {
		it('checks mongoose has connected to the test database not development', function(done) {
			chai.request(app)
			expect(mongoose.connection.name === 'archivse-test')
			done()
		})

		it('should connect to development database when NODE_ENV is "!== test"', function(done) {
			NODE_ENV = 'development'
			chai.request(app)
			expect(mongoose.connection.name === 'archivise')
			done()
			NODE_ENV = 'test'
		})
	})
})