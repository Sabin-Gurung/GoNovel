
const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const Novel = require("../../models/novel");

router.get("/", (req, res)=>{
    res.json({message : "Welcome to go novel api v1."});
});

// ------------------ users -----------------------------

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

// ------------------ novels -----------------------------
router.get("/novels", (req, res)=>{
    //return all novels
    res.json("not implemented yet");
});

router.get("/novels/:novelid", (req, res)=>{
    //return novels
    res.json("not implemented yet");
});

router.post("/novels", (req, res)=>{
    // create novel
    //return novels
    res.json("not implemented yet");
});

router.patch("/novels/:novelid", (req, res)=>{
    // create modify
    //return novels
    res.json("not implemented yet");
});

module.exports = router;