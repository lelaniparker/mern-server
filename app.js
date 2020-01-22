const express = require("express") // For our express server
const cors = require("cors") // Enabling application middleware to allow cross origin resource sharing
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)
const passport = require('passport');	// Set up authentication with Passport/ add the username from req.user
const passportLocalMongoose = require('passport-local-mongoose');

// Setting up routing
const dataRouter = require("./routes/data_routes") // Set up routing
const postRouter = require("./routes/posts_routes")
const userRouter = require("./routes/user_routes")
const authRouter = require('./routes/auth_routes');

// load the config to connect to the database
const { mongooseConnect } = require('./config/mongoose_connection')

const app = express()

// This whitelist and corsOptions is via the cors dependency docs but does not work. The idea is to only allow cors from these origins
const whitelist = ['https://analyzevit.netlify.com/', 'http://localhost:3000/']
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

// currently cors is letting through all api calls, in the future we will restrict to only our front end
app.use(cors({
	origin: function (origin, callback) {
		callback(null, true)
	},
	credentials: true
}));
app.use(bodyParser.json())
app.options('*', cors())

// Loads .env config file  (environment variables) if not in production
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// connect to the database, depending on what environment the server is in
mongooseConnect(process.env.NODE_ENV);

// Define express session object here
// require express-session and MongoStore
// use session object (with secret, etc.)
app.use(session({
	// resave and saveUninitialized set to false for deprecation warnings
	secret: "Express is awesome",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1800000
	},
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
}));

// Passport configuration
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// routes setup
app.use("/data", dataRouter)
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/user", userRouter);

// port for the server - production server or 3009
const port = process.env.PORT || 3009;
app.listen(port, () => {
	console.log(`AnalyzeVit app listening on port ${port}`)
})

// export app, used in tests
module.exports = {
	app
}