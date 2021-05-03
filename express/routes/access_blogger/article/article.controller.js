const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {createArticle, updateArticle} = require("./article.service");



router.post("/", formidableMiddleware(), createArticle);
router.put("/", formidableMiddleware(), updateArticle);



module.exports = router;
