const express = require("express");
const router = express.Router();

router.get("/novels/:novelid", (req, res, next) => {
    res.send(`not implemented yet ${req.params.novelid}`);
})

module.exports = router;