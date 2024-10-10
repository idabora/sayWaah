const express = require('express');
const router = express.Router();
const {isAuth}=require('../middleware/auth')
const {User,Help}=require('../Model/index')
const {
    addForHelp, postHelp
} = require('../controllers/helpController')

router.get('/askhelp', isAuth,addForHelp);

router.post('/posthelp',isAuth, postHelp);

module.exports = router;