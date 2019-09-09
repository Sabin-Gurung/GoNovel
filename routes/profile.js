
const express = require("express");
const router = express.Router();

const User = require("../models/user");


router.get("/users/:username", (req, res, next) => {
    User.findOne({username : req.params.username}, (err, user) => {
        if (err)
            return next(err);
        if (!user){
            res.status(404).send("Sorry Username not found");
            return;
        }
        if (!req.session.username || req.session.username != user.username) {
            res.render("profile.html", {
                user: user,
                canEdit:false
            });
            return;
        }
        res.render("profile.html", {
            username:user.username,
            user: user,
            canEdit:true});
    });
})

module.exports = router;