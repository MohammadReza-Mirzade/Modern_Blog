const express = require('express');
const router = express.Router();
const article = require('./article/article.controller');
const path = require('path');

router.get("/article", article);


router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../reactjs-admin/build', 'index.html'));
});


module.exports = router;
