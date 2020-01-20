const express = require('express');
const router = express.Router()
const { getUser,updateUser } = require("../controllers/dashboard_controller")

router.get('/:userId', getUser);
router.put('/:userId', updateUser);

module.exports = router