const express = require('express');
const router = express.Router();
const {getAllBloggers, deleteBlogger, changePassword} = require('./blogger.service');



router.get("/", getAllBloggers);
router.delete("/", deleteBlogger);
router.put("/", changePassword);



module.exports = router;
