const { User } = require('../Model/index');

module.exports.logIn = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, email } = req.body;

        if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
            return res.status(400).json({ message: "Fields should not be Empty." });
        }

        let newUser = await User.findOne({ email });
        if (!newUser) {
            newUser = await User.create(req.body);
        } req.session.regenerate(async (err) => {
            if (err) {
                return res.status(500).json({ message: "Error regenerating session." });
            }

            req.session.userId = newUser._id;
            req.session.isAuthenticated = true;
            req.session.cookie.maxAge = 60 * 2 * 1000; // 2 minutes session expiry
            req.session.sessionId = req.sessionID;

            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: "Error saving session." });
                }
                console.log(req.session);
                res.status(201).redirect('/dashboard');
            });
        });

    } catch (error) {
        console.error("Error in logIn:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports.logOut = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error("Error during logout:", err);
                return res.status(500).send('Error logging out.');
            }

            res.clearCookie('connect.sid');  // 'connect.sid' is the default cookie name used by express-session

            res.status(200).render('login');  // Assuming you want to render the login page after logout
        });

    } catch (error) {
        console.error("Unexpected error in logOut:", error);
        res.status(500).json({ message: "Internal server error during logout." });
    }
};

