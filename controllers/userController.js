const { User } = require("../Model");

module.exports.completeProfile = async (req, res) => {
    try {
        const { city, gender, occupation } = req.body;

        if (!city || !gender || !occupation) {
            return res.status(400).json({ message: "City,Occupation and Gender is requred." })
        }

        console.log(req.body.city, req.body.state, req.body.city, req.body.occupation);
        const updateduser = await User.findByIdAndUpdate(req.body.userId, { city, gender, occupation, isProfileCompleted: true }, { new: true })
        // return res.stsatus(200).json({ user: updateduser })
        res.status(200).render('getprofile')
    } catch (err) {
        return res.status(400).json({
            message: "Error updataing User.",
            error: err
        });

    }

}

module.exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.body.userId);

        if (!user) {
            return res.status(400).json({ message: "Something Went wrong." });
        }

        return res.status(200).json({ user: user });
    } catch (err) {
        return res.status(400).json({
            message: "Error updataing User.",
            error: err
        });
    }

}