const express = require("express")
const cors = require("cors") // Enabling application middleware
const bodyParser = require("body-parser")
const dataRouter = require("./routes/data_routes") // Set up routing
const postRouter = require("./routes/posts_routes")
const userRouter = require("./routes/dashboard_routes")
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)
const passport = require('passport');	// Set up authentication with Passport/ add the username from req.user

const passportLocalMongoose = require('passport-local-mongoose');
const authRouter = require('./routes/auth_routes');

// load the config to connect to the database
const { mongooseConnect } = require('./config/mongoose_connection')

const app = express()
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
// Passport configuration (AFTER const app = express())
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use("/data", dataRouter)
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/dashboard", userRouter);

const port = process.env.PORT || 3009;
app.listen(port, () => {
	console.log(`AnalyzeVit app listening on port ${port}`)
})