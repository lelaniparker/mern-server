const express = require("express");
const router = express.Router();
const {
    register,
    login,
    logout,
    activeUserSession
} = require("../controllers/auth_controller");

// routes for the auth routes.
// routes start with "/auth/"
router.post("/register", register);
router.post("/login", login);
router.get('/logout', logout);
router.get('/user', activeUserSession);

module.exports = router;