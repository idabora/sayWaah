module.exports.addForHelp= async(req,res)=>{

    if(!req.body?.isProfileCompleted){
        return res.redirect('/user/completeprofile')
    }
    res.send("profile completed")

}

module.exports.postHelp=async(req,res)=>{



}