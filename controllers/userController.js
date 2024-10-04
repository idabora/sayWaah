const { User } = require("../Model");

module.exports.completeProfile = async (req, res) => {
    try {
        const { city, gender, occupation, longitude, lattitude } = req.body;

        if (!city || !gender || !occupation || !longitude || !lattitude) {
            return res.status(400).json({ message: "City,Occupation and Gender is requred." })
        }

        const updateduser = await User.findByIdAndUpdate(req.body.userId, { city, gender, occupation, location: { type: "Point", coordinates: [longitude, lattitude] } }, { new: true })

        return res.status(200).json({ user: updateduser })
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