
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

router.get("/users/:username", (req, res, next)=>{
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

router.patch("/users/:username", (req, res, next)=>{
    User.findOne({username : req.params.username}, (err, user) => {
        if (err)
            return next(err);
        if (!user){
            res.status(304).json({errorMessage : "User not found in data base"})
            return;
        }
        user.set(req.body);
        user.save((err, updatedUser)=>{
            if (err)
                return next(err);
            res.status(200).json({user: updatedUser});
        });
    });
});


module.exports = router;