// sets the environment to test, to use the test database
process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

// getting our app and mongoose
const { app } = require('../app')
const { mongoose } = require('../config/mongoose_connection')

const { expect } = chai

describe('Mongoose connection Tests',() => {
	describe('test vs development database connection', () => {
		it('checks mongoose has connected to the test database not development', (done) => {
			chai.request(app)
			expect(mongoose.connection.name === 'analyzevit')
			done()
		})

		it('should connect to development database when NODE_ENV is "!== test"', (done) => {
			NODE_ENV = 'development'
			chai.request(app)
			expect(mongoose.connection.name === 'analyzevit')
			done()
			NODE_ENV = 'test'
		})
	})
})