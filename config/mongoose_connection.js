const mongoose = require('mongoose')

// connects to the test database if it is a test, otherwise will connect to the production database
const mongooseConnect = env => {
	if (env === 'test') {
		mongoose
			.connect('mongodb://localhost/analyzevit_test', {
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
			.catch(error => console.log(error))
	} else {
		mongoose
			.connect(process.env.MONGODB_URL, {
				useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
			})
			.then(console.log('connected to the database'))
			.catch(error => console.log(error))
	}
	// This logs any errors after the initial connection
	mongoose.connection.on('error', err => console.log(err))
}

module.exports = {
	mongooseConnect,
	mongoose
}