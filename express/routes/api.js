const express = require('express');
const router = express.Router();
const blogger = require('./access_blogger/api');
const admin = require('./access_admin/api');
const auth = require('./auth/auth.controller');
const general = require('./access_general/api');
const generalTools = require('../tools/general-tools');
const path = require('path');



router.use('/auth', generalTools.sessionFalse, auth);
router.use('/blogger', generalTools.sessionBlogger, blogger);
router.use('/admin', generalTools.sessionAdmin, admin);
router.use('/', general);



router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../reactjs/build', 'index.html'));
});

module.exports = router;
