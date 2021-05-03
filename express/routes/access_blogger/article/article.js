const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const {createArticle, updateArticle} = require("./article.service");



router.post("/", (req, res) => {
    if (!req.fields.title || !req.files.images || !req.files.avatar) return res.json({msg : "Bad Request."});
    return res.json({msg : "till now there isn't any problem."});

});
router.put("/", (req, res) => {

});



module.exports = router;
