const Article = require("../../../models/Article");
const Comment = require("../../../models/Comment");
const fs = require('fs');
const path = require('path');




getAllArticles = (req, res) => {
    Article.find({}).populate("owner").exec((err, articles) => {
        if (err) return res.json({msg: "Internal Error Server"});
        const articlesSP = [];
        articles.forEach(article => {
            articlesSP.push({
                avatar: ("/article/" + article._id + "/" + article.avatar),
                title: article.title,
                createdAt: article.createdAt,
                key: article._id,
                owner: article.owner.username,
            });
        });
        res.json({articles: articlesSP});
    });
};




deleteArticle = (req, res) => {
    Article.deleteOne({_id: req.body.id}, (err, article) => {
        if (err) return res.json({msg: "Internal Server Error"});
        Comment.deleteMany({article: article._id}, (err, comments) => {
            if (err) return res.json({msg: "Internal Server Error"});
            (async () => {
                try {
                    fs.rmdirSync(path.join(__dirname, "../../../../file/article/" + article._id.toString()), { recursive: true });
                    res.json({msg: "success"});
                } catch (e) {
                    return res.json({msg: "Internal Server Error."});
                }
            })();
        });
    });
}




module.exports = {
    getAllArticles,
    deleteArticle,
};
