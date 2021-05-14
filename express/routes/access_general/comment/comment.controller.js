const express = require('express');
const router = express.Router();
const {getAllComments, createNewComment} = require("./comment.service");



router.get("/", getAllComments);
router.post("/", createNewComment);



module.exports = router;
