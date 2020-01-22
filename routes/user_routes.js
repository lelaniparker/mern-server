const express = require('express');
const router = express.Router()
const { getUser,updateUser } = require("../controllers/user_controller")

// routes for getting user details.
// routes start with "/user", as defined in the app.
router.get('/:userId', getUser);
router.put('/:userId', updateUser);

module.exports = router