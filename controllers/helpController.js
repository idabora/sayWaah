module.exports.addForHelp= async(req,res)=>{
    console.log("HELOOOOOOOOOOOOO");
    if(!req.body?.isProfileCompleted){
        return res.render('completeProfile')
    }
    res.send("profile completed")

}

module.exports.postHelp=async(req,res)=>{



}