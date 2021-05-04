const express = require('express');
const router = express.Router();
const {getAllArticle} = require("./article.service");


router.get("/", getAllArticle);


module.exports = router;
