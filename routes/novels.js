const express = require("express");
const router = express.Router();

const Novel = require("../models/novel")

router.get("/novels/:novelid", (req, res, next) => {
    Novel.findOne({novelid : req.params.novelid}, (err, novel) => {
        if (err)
            return next(err);
        if (!novel)
            return next();
        
        res.render("novel.html", {novel : novel});
    });
})

module.exports = router;