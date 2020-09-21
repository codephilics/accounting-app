const express = require("express");
const router = express.Router();
var path = require("path");

router.get("/test", (req, res) => res.send("Test index", { 'Content-Type': 'text/plain' }, 200));

router.get("/", (req, res) => 
    res.sendFile("../views/index.html")
);

module.exports = router;