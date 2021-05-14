const express = require('express');
const router = express.Router();
const generalTools = require('../../tools/general-tools');
const article = require('./article/article.controller');
const comment = require("./comment/comment.controller");


router.get('/session', generalTools.sessionChecker);
router.use('/article', article);
router.use("/comment", comment);


module.exports = router;
