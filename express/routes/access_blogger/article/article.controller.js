const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {createArticle, updateArticle, getBloggerArticle} = require("./article.service");



router.post("/", formidableMiddleware(), createArticle);
router.put("/", formidableMiddleware(), updateArticle);
router.get("/", getBloggerArticle);



module.exports = router;
