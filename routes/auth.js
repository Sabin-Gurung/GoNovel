
const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login.html");
});

router.post("/login", (req, res) => {
    res.send("login not implemented");
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