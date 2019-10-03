const express = require("express");

const router = express.Router();

// router.get("/home", checkSignIn, (req, res) => {
router.get("/home", (req, res) => {
    if (req.session.username) {
        res.render("home.html", {username : req.session.username});
        return;
    }

    res.render("home.html");
});

router.get("/welcome", (req, res) => {
    res.render("welcome.html");
});

router.get("/", (req, res) => {
    res.redirect("/welcome");
});


module.exports = router;