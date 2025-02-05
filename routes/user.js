const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

//SignUp request route
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})


//SignUp Route
router.post("/signup", wrapAsync(userController.signupUser));


//Login request route
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

//LogIn route
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust.!")
        let redirectUrl = res.locals.redirectUrl || "/listings";
        console.log(redirectUrl);
        res.redirect(redirectUrl);
    }
);


//Log-out route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            req.flash("success", "Logged you out.!");
            res.redirect("/listings");
        }
    })
})

module.exports = router;