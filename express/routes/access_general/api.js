const express = require('express');
const router = express.Router();
const generalTools = require('../../tools/general-tools');


router.get('/session', generalTools.sessionChecker);
router.get('/article', );


module.exports = router;
