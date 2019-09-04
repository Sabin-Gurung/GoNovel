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

    User.findOne({username : username}, (err, user) => {
        if (err)
            return next(err);
        if (!user){
            res.render("login.html", {errorMessage : "User does not exit"});
            return;
        }
        if (user.password != password){
            res.render("login.html", {errorMessage : "Invalid password."});
            return;
        }
        console.log("validation correct");
        req.session.username = user.username;
        res.redirect("/home");
    });
});

router.get("/signup", (req, res) => {
    res.send("signup not implemented");
});

router.post("/signup", (req, res) => {
    res.send("signup not implemented");
});

router.get("/logout", (req, res) => {
    if (req.session.username)
        req.session.destroy();
    res.send("log out not implemented");
});




module.exports = router;