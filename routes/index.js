const express = require("express");
const router = express.Router();
const verify = require('./verifyToken');

router.get("/", (req, res) => 
    res.sendFile("../views/index.html")
);

module.exports = router;