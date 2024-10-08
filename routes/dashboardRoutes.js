const express = require('express');
const router = express.Router();
const { User } = require("../Model/index");
const {isAuth} = require('../middleware/auth');
const { dashboard,updateLocation } = require('../controllers/dashboardController');

router.get('/', isAuth, dashboard);
router.post('/updateLocation', isAuth, updateLocation);

module.exports = router;