const express = require('express');
const router = express.Router();
const {isAuth}=require('../middleware/auth');
const {logIn,logOut}=require('../controllers/authController')
const { User } = require("../Model/index")


// app.use(express.json())
router.get('/', async (req, res) => {
    res.status(200).render('login');
});

router.post('/login',logIn);
router.get('/logout', isAuth,logOut);

module.exports = router;
