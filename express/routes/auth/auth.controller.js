const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {signup, login, checkUsername, createAdmin} = require("./auth.service");

router.post('/checkUsername', checkUsername);
router.post('/signup', formidableMiddleware(), signup);
router.post('/login', login);
router.post('/createAdmin', createAdmin);



module.exports = router;
