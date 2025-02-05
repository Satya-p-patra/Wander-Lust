const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");
const passport = require("passport");

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username })
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            } else {
                req.flash("success", "Welcome to Wanderlust!");
                res.redirect("/listings");
            }
        })

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}
