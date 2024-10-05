const { User } = require("../Model");

module.exports.isAuth = async (req, res, next) => {
    if (req.session.isAuthenticated) {

        let user=await User.findById(req.session.userId,"firstName lastName email city isProfileCompleted")
        req.body={...req.body,...user,...req.session.userId};
        for(let key in user){
            req.body[key]=user[key];
        }
        // req.body.userId = req.session.userId;

        next();
    } else {
        res.render('login')
    }
}