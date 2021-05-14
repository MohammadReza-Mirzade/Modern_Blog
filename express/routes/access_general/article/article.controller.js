const express = require('express');
const router = express.Router();
const {getAllArticle, getArticle} = require("./article.service");


router.get("/all", getAllArticle);
router.get("/", getArticle);


module.exports = router;
