
const express = require("express");
const router = express.Router();

const User = require("../../models/user");

router.get("/", (req, res)=>{
    res.json({message : "Welcome to go novel api v1."});
});

router.get("/users", (req, res)=>{
    User.find({}, "username firstName lastName bio email createdAt", (err, users) => {
        var output = {};
        output["users"] = [];
        users.forEach((user)=>{
            output["users"].push(user);
        })
        res.send(output);
    });
});

router.get("/users/:username", (req, res)=>{
    User.findOne({username : req.params.username}, "username firstName lastName bio email createdAt", (err, user) => {
        if (err)
            return next(err);
        if (!user){
            res.json({errorMessage : "User not found in data base"})
            return;
        }
        res.json(user);
    });
});





module.exports = router;