const { User, Help } = require("../Model/index");
const{objectId}=require('mongoose')

module.exports.addForHelp = async (req, res) => {
    console.log("HELOOOOOOOOOOOOO");
    if (!req.user?.isProfileCompleted) {
        return res.render('completeProfile')
    }
    return res.status(200).render('helpinfo')


}


module.exports.postHelp = async (req, res) => {
    try {
        const { firstName, lastName, description, category, latitude, longitude } = req.body;

        // Check for required fields
        if (!firstName.trim() || !lastName.trim() || !description.trim() || !category.trim() || !latitude || !longitude) {
            return res.status(400).json({ message: "Required fields to be filled" });
        }

        // Prepare location object
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude] // Order should be [longitude, latitude]
        };

        // Create help request
        const helpDetails = await Help.create({
            firstName,
            lastName,
            description,
            category,
            location,
            userId: req.user._id
        });

        console.log(helpDetails);
        return res.status(200).json({ message: "DONE", redirectUrl: '/dashboard' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Error creating help request.",
            error: err.message
        });
    }
};

module.exports.getHelpInfo = async(req,res)=>{
try {
    
    const {id}=req.params;
    console.log("++>>",req.params,id);
    if(!id){
        return res.status(400).json({message:"_id not found",redirectUrl:'/dashboard'})
}

let helpData = await Help.findById(id);
console.log(helpData);
if(!helpData){
    return res.status(400).json({message:"Help Data not found"});
}

return res.status(200).render('helpData',{helpData});
} catch (err) {
    console.error(err);
    return res.status(400).json({
        message: "Error getting Help Info.",
        error: err.message
    });
}

}