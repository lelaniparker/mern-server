const passport = require("passport");
const User = require("../models/user");

const register = function (req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function (err) {
        if (err) {
            res.status(500);
            res.json({
                error: err
            });
        } else {
            // Log in the newly registered user
            passport.authenticate('local')(req, res, function () {
                console.log('authenticated', req.user.username);
                console.log('session object:', req.session);
                console.log('req.user:', req.user);
                res.status(200);
                res.json(req.user);
            });
        }
    });
};

module.exports = { register };