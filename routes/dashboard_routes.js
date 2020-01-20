const express = require('express');
const router = express.Router()
const { getUser } = require("../controllers/dashboard_controller")

router.get('/:userId', getUser);

module.exports = router