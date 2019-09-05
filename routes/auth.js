const express = require("express");

const router = express.Router();

// models
var User = require("../models/user");

router.get("/login", (req, res) => {
    res.render("login.html");
});

router.post("/login", (req, res, next) => {
    // validate user
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username : username.toLowerCase()}, (err, user) => {
        if (err)
            return next(err);
        if (!user){
            req.flash("error", "User does not exist");
            res.redirect("/login");
            return;
        }
        if (user.password != password){
            req.flash("error", "Invalid password");
            res.redirect("/login");
            return;
        }
        console.log("validation correct");
        req.session.username = user.username;
        res.redirect("/home");
    });
});

router.get("/signup", (req, res) => {
    res.render("signup.html");
});

router.post("/signup", (req, res) => {
    res.send("signup post not implemented");
});

router.get("/logout", (req, res) => {
    if (req.session.username)
        req.session.destroy();
    res.send("log out not implemented");
});




module.exports = router;