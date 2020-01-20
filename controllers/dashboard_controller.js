const User = require("../models/user")

const getUser = function (req, res) {
    const userId = req.params.userId;
    User.findById(userId).exec(function (err, user) {
        if (err) {
            res.setStatus(500);
            res.send(err);
        }
        if (!user) {
            // Didn't find user
            res.setStatus(404);
            res.send("User not found");
        }
        else {
            res.setStatus(200);
            res.send(user);
        }
    });
};

module.exports = {
    getUser,
};