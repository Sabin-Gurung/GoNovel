
const express = require("express");
const router = express.Router();

const User = require("../models/user");


router.get("/users/:username", (req, res, next) => {
    User.findOne({username : req.params.username}, (err, user) => {
        if (err)
            return next(err);
        if (!user){
            res.send("Usernot found");
            return;
        }
        res.send("user found")
    });
})

module.exports = router;