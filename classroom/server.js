const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;

    if (name === "anonymous") {
        req.flash("error", "User is not registered.!");
    } else {
        req.flash("success", "User registered successfully.!");
    }

    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
});

app.get("/test", (req, res) => {
    res.send("Test successful..!");
});

app.listen(3000, () => {
    console.log("Server listening to port 3000");
});
