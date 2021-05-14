const express = require('express');
const router = express.Router();
const {getAllComments, deleteComment} = require('./comment.service');



router.get("/", getAllComments);
router.delete("/", deleteComment);



module.exports = router;
