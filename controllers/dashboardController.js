const { User, Help } = require('../Model/index');

module.exports.dashboard = async (req, res) => {
    await User.find()
    res.status(200).render('home');
    // return res.status(200).json({message:"DONEs"})
}

module.exports.updateLocation = async (req, res) => {

    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "longitude and latitude is required" });
    }

    const user = await User.findByIdAndUpdate(req.session.userId, { location: { type: "Point", coordinates: [longitude, latitude] } }, { new: true });
    console.log(user);
    return res.status(200).json({ message: "saved successfully", user: user });


}

module.exports.getMarkers = async (req, res) => {
    try {
        let helps = await Help.find({ status: false }).select("location category");
        console.log("HELPS",helps);
        if (helps.length) {
            return res.status(200).json({ message: "Helps fetched Successfully..", data: helps });
        }
        return res.status(200).json({ message: "No helps Found" });


    } catch (err) {
        return res.status(400).json({
            message: "Error while getMarkers",
            error: err.message
        });
    }
}