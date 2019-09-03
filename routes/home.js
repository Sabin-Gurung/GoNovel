const express = require("express");

const router = express.Router();

var checkSignIn = (req, res, next)=>{
    if (req.session.username)
        next();
    else
        res.send("You are not logged in");
}

router.get("/home", checkSignIn, (req, res) => {
    res.render("home.html");
});

module.exports = router;