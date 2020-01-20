const express = require("express")
const cors = require("cors") // Enabling application middleware
const bodyParser = require("body-parser")
const dataRouter = require("./routes/data_routes") // Set up routing
const postRouter = require("./routes/posts_routes")
const userRouter = require("./routes/dashboard_routes")
const mongoose = require("mongoose");
//const session = require('express-session');
const passport = require('passport');	// Set up authentication with Passport/ add the username from req.user

const passportLocalMongoose = require('passport-local-mongoose');
const authRouter = require('./routes/auth_routes');

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
app.use(cors({
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}));
app.use(bodyParser.json())
app.options('*', cors())

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const dbConn = process.env.MONGODB_URL || "mongodb://localhost/analyzevit"
// const dbConn = "mongodb://localhost/analyzeVit"
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(
	dbConn,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	err => {
		if (err) {
			console.log("Error connecting to database", err)
		} else {
			console.log("Connected to database!")
		}
	}
)

// Define express session object here
// require express-session and MongoStore
// use session object (with secret, etc.)

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