const express = require('express');
const router = express.Router();
const { User } = require("../Model/index");
const {isAuth} = require('../middleware/auth');
const { dashboard } = require('../controllers/dashboardController');

router.get('/', isAuth, dashboard);

module.exports = router;