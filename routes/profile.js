
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
        if (!req.session.username || req.session.username != user.username) {
            res.send("user found but you cannot edit");
            return;
        }
        res.send("user found and you can edit");
    });
})

module.exports = router;