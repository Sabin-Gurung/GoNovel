
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
    Novel.find({}, "author title summary content createdAt updatedAt novelid", (err, novels) => {
        var output = {};
        output["novels"] = [];
        novels.forEach((novel)=>{
            output["novels"].push(novel);
        })
        res.json(output);
    });
});

router.get("/novels/:novelid", (req, res)=>{
    Novel.findOne({novelid : req.params.novelid}, "author title summary content createdAt updatedAt novelid", (err, novel) => {
        if (err)
            return next(err);
        if (!novel){
            res.status(304).json({errorMessage : "Novel not found in data base"})
            return;
        }
        res.json(novel);
    });
});

router.post("/novels", (req, res, next)=>{
    // create novel
    let novel = new Novel(req.body);
    novel.save((err, novel)=>{
        if (err) next(err);
        console.log('success')
        res.json(novel);
    });
});

router.patch("/novels/:novelid", (req, res)=>{
    Novel.findOne({novelid : req.params.novelid}, "author title summary content createdAt updatedAt novelid", (err, novel) => {
        if (err)
            return next(err);
        if (!novel){
            res.status(304).json({errorMessage : "Novel not found in data base"})
            return;
        }
        novel.set(req.body);
        novel.save((err, updatedNovel)=>{
            if (err)
                return next(err);
            res.status(200).json({novel: updatedNovel});
        });
    });
});

module.exports = router;