const express = require("express");
const router = express.Router();

const Novel = require("../models/novel")

const authmiddleware = require("../middlewares/auth")

router.get("/novels/:novelid", (req, res, next) => {
    Novel.findOne({novelid : req.params.novelid}, (err, novel) => {
        if (err)
            return next(err);
        if (!novel)
            return next();
        
        if (req.session.username) {
            if (novel.author == req.session.username){
                return res.render("novel.html", {canEdit: true,novel : novel, username : req.session.username});
            }
            return res.render("novel.html", {novel : novel, username : req.session.username});
        }
        res.render("novel.html", {novel : novel});
    });
})

router.get("/novels-create", authmiddleware.checkSignIn, (req, res, next) => {
        res.send("creating novel");
})

module.exports = router;