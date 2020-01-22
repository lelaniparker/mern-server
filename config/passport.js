const passport = require("passport");
const User = require("../models/user");

// sets up the user strategy for passport, which provides user authentication for the website.
// it sets the user model as the model for passport and the strategy tells passport how to act.
// we are using a local strategy, and using a dependency to create the strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());