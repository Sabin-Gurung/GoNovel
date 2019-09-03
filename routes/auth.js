const express = require("express");

const router = express.Router();

// models
var User = require("../models/user");

router.get("/login", (req, res) => {
    res.render("login.html");
});

router.post("/login", (req, res) => {
    // validate user
    let username = req.body.username;
    let password = req.body.password;

    console.log(req.body);
    res.redirect("/login");
});

router.get("/signup", (req, res) => {
    res.send("signup not implemented");
});

router.post("/signup", (req, res) => {
    res.send("signup not implemented");
});

router.get("/logout", (req, res) => {
    res.send("log out not implemented");
});




module.exports = router;