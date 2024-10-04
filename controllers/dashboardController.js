const {User}=require('../Model/index');

module.exports.dashboard = async (req, res) => {
    res.status(200).render('home');
    // return res.status(200).json({message:"DONEs"})
}