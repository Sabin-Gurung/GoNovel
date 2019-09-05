const express = require("express");

const router = express.Router();

// models
var User = require("../models/user");

router.get("/login", (req, res) => {
    res.render("login.html");
});

router.post("/login", (req, res, next) => {
    // validate user
    let username = req.body.username.toLowerCase().trim();
    let password = req.body.password;

    User.findOne({username : username}, (err, user) => {
        if (err)
            return next(err);
        if (!user){
            req.flash("error", "User does not exist");
            res.redirect("/login");
            return;
        }
        user.checkPassword(password, (err, isMatch) => {
            if (err){
                next(err);
            }
            if (isMatch){
                req.session.username = user.username;
                res.redirect("/home");
            }
            else{
                req.flash("error", "Invalid password");
                res.redirect("/login");
            }
        });
    });
});

router.get("/signup", (req, res) => {
    res.render("signup.html");
});

router.post("/signup", (req, res) => {
    let username = req.body.username.toLowerCase().trim();
    let password = req.body.password;
    
    User.findOne({username : username}, (err, user) => {
        if (err)
            return next(err);
        if (user){
            req.flash("error", "User alreay exist. Choose a different name");
            res.redirect("/signup");
            return;
        }
        var user = new User({username:username, password: password});
        user.save((err)=>{
            if (err)
                next(err);
            res.redirect("/login");
        });
    });
});

router.get("/logout", (req, res) => {
    if (req.session.username)
        req.session.destroy();
    res.send("log out not implemented");
});


module.exports = router;