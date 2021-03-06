const express = require("express");

const router = express.Router();

// models
var User = require("../models/user");

router.get("/login", (req, res) => {
    if (req.session.username){
        res.send("you are already logged in man");
        return;
    }
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
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let bio = req.body.bio;
    let email = req.body.email;

    if (username.includes(" ")) {
        req.flash("error", "Username cannot have spaces");
        return res.redirect("/signup");
    }
    
    User.findOne({username : username}, (err, user) => {
        if (err)
            return next(err);
        if (user){
            req.flash("error", "User alreay exist. Choose a different name");
            res.redirect("/signup");
            return;
        }
        var user = new User( {
                username:username, 
                password: password,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                email: email
            });
        user.save((err)=>{
            if (err)
                next(err);
            res.redirect("/login");
        });
    });
});

router.get("/logout", (req, res) => {
    if (req.session.username) {
        req.session.destroy();
        res.redirect("/home");
        return;
    }
    res.send("You are not logged in to be logged out");
});


module.exports = router;