const express = require('express');
const router = express.Router();
const {logout} = require("./admin.service");

router.get("/logout", logout);


module.exports = router;
