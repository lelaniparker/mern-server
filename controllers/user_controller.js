const User = require("../models/user")

// Controller for getting user details

// function returns a single user
const getUser = function (req, res) {
    const userId = req.params.userId;
    User.findById(userId).exec(function (err, user) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        if (!user) {
            // Didn't find user
            res.status(404);
            res.send("User not found");
        }
        else {
            res.status(200);
            res.send(user);
        }
    });
};

// function updates a user's details
const updateUser = function (req, res) {
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, req.body, { new: true }).exec(function (err, user) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else {
            res.status(200);
            res.send({message: "You've updated your details!", user});
        }
    });
};

module.exports = {
    getUser,
    updateUser,
};
