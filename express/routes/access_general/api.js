const express = require('express');
const router = express.Router();
const generalTools = require('../../tools/general-tools');
const article = require('./article/article.controller');


router.get('/session', generalTools.sessionChecker);
router.use('/article', article);


module.exports = router;
