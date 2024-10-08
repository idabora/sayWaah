const { User } = require("../Model");

module.exports.isAuth = async (req, res, next) => {
    if (req.session.isAuthenticated) {

        let user=await User.findOne({_id:req.session.userId},"firstName lastName email city isProfileCompleted");
        // console.log("++",user,"&&",req.session,"^^",req.user);
        // let session = req.session;
        req.user={...user._doc,...req.session};
        // console.log(req.user);
        // for(let key in user){
        //     req.user[key]=user[key];
        // }
        console.log(req.user);
        // req.body.userId = req.session.userId;

        next();
    } else {
        res.render('login')
    }
}