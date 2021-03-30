const express = require('express');
const router = express.Router();
const blogger = require('./access_blogger/blogger');
const auth = require('./auth/auth');
const generalTools = require('../tools/general-tools');
const path = require('path');


router.get('/session', generalTools.sessionChecker);
router.use('/auth', auth);
router.use('/blogger', generalTools.bloggerLoginChecker, blogger);
// router.use('', comment);
// router.use('', article);




router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../reactjs/build', 'index.html'));
});

module.exports = router;
