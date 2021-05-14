const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {createArticle, updateArticle, getBloggerArticle, deleteArticle} = require("./article.service");



router.post("/", formidableMiddleware(), createArticle);
router.put("/", formidableMiddleware(), updateArticle);
router.delete("/", deleteArticle);
router.get("/", getBloggerArticle);



module.exports = router;
