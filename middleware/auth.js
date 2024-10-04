module.exports.isAuth = async (req, res, next) => {
    if (req.session.isAuthenticated) {
        req.body.userId = req.session.userId;

        next();
    } else {
        res.render('login')
    }
}