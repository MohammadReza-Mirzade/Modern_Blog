const express = require('express');
const router = express.Router();
const blogger = require('./blogger/blogger.controller');
const article = require('./article/article.controller');


router.use('/', blogger);
router.use('/article', article);


module.exports = router;
