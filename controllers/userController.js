const { User } = require("../Model");

module.exports.completeProfile = async (req, res) => {
    try {
        const { city, gender, occupation,state,country } = req.body;

        if (!city || !gender || !occupation || !state || !country) {
            return res.status(400).json({ message: "City,Occupation and Gender is requred." })
        }
        console.log("========>>>>>",req.body);
        // console.log(req.body.city, req.body.state, req.body.city, req.body.occupation);
        const updateduser = await User.findByIdAndUpdate(req.user.userId, { city,state,country, gender, occupation, isProfileCompleted: true }, { new: true })
        console.log(updateduser);
        // return res.stsatus(200).json({ user: updateduser })
        // res.status(200).redirect('/user/getprofile')
        return res.status(200).json({ message: "Profile updated successfully", redirectUrl: '/user/getprofile' });

    } catch (err) {
        return res.status(400).json({
            message: "Error updataing User.",
            error: err
        });

    }

}

module.exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(400).json({ message: "Something Went wrong." });
        }
        console.log(user);
        return res.status(200).render('getprofile', { user });
    } catch (err) {
        return res.status(400).json({
            message: "Error updataing User.",
            error: err
        });
    }

}

module.exports.editProfileDetails = async (req, res) => {
    try {
        const { city, gender, occupation, firstNname, lastName } = req.body;

        if (!city || !gender || !occupation) {
            return res.status(400).json({ message: "City,Occupation and Gender is requred." })
        }

        // console.log(req.body.city, req.body.state, req.body.city, req.body.occupation);
        const updateduser = await User.findByIdAndUpdate(req.body.userId, { firstNname, lastName, city, gender, occupation, isProfileCompleted: true }, { new: true })
        // return res.stsatus(200).json({ user: updateduser })
        // res.status(200).redirect('/user/getprofile')
        return res.status(200).json({ message: "Profile updated successfully", redirectUrl: '/user/getprofile' });

    } catch (err) {
        return res.status(400).json({
            message: "Error updataing User.",
            error: err
        });

    }
}