const express = require("express");

const router = express.Router();

var checkSignIn = (req, res, next)=>{
    if (req.session.username)
        next();
    else
        res.send("You are not logged in");
}

// router.get("/home", checkSignIn, (req, res) => {
router.get("/home", (req, res) => {
    if (req.session.username) {
        res.render("home.html", {username : req.session.username});
        return;
    }

    res.render("home.html");
});

module.exports = router;