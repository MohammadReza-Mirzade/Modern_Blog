const express = require('express');
const router = express.Router();
const {getAllArticles, deleteArticle} = require('./article.service');



router.get("/", getAllArticles);
router.delete("/", deleteArticle);



module.exports = router;
