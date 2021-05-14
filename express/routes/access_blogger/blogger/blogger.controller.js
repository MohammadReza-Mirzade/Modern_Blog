const express = require('express');
const router = express.Router();
// const formidableMiddleware = require('express-formidable');
const {update, logout} = require("./blogger.service");



router.put('/', update);
// router.put('/updateAvatar', formidableMiddleware, updateAvatar);
router.get("/logout", logout);



module.exports = router;
