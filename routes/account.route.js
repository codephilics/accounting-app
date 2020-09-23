const express = require("express");
const router = express.Router();
const verify = require('./verifyToken');

router.post("/add",verify, (req, res) => {

});

module.exports = router;