const express = require('express');
const router = express.Router();
const path = require('path');
const article = require('./article/article.controller');
const admin = require('./admin/admin.controller');
const blogger = require('./blogger/blogger.controller');
const comment = require('./comment/comment.controller');


router.use("/", admin);
router.use("/article", article);
router.use("/blogger", blogger);

router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../../reactjs-admin/build', 'index.html'));
});


module.exports = router;
