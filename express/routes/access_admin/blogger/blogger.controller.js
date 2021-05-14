const express = require('express');
const router = express.Router();
const {getAllBloggers, deleteBlogger} = require('./blogger.service');



router.get("/", getAllBloggers);
router.delete("/", deleteBlogger);



module.exports = router;
