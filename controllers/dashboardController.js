const { User } = require('../Model/index');

module.exports.dashboard = async (req, res) => {
    res.status(200).render('home');
    // return res.status(200).json({message:"DONEs"})
}

module.exports.updateLocation = async (req, res) => {

    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: "longitude and latitude is required" });
    }

    const user = await User.findByIdAndUpdate(req.session.userId, { location: { type: "Point", coordinates: [longitude, latitude] } },{new :true});
    console.log(user);
    return res.status(200).json({ message: "saved successfully", user: user });


}