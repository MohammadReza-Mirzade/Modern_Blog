const Article = require("../../../models/Article");
const fs = require("fs");
const path = require("path");



const getAllArticle = (req, res) => {

    Article.find({})
        .populate("owner")
        .skip(+req.body.perPage*(+req.body.page-1))
        .limit(+req.body.perPage)
        .exec((err, articles) => {
            if (err) return res.json({msg: "Internal Error Server."});
            Article.countDocuments({}, (err, count) => {
                if (err) return res.json({msg: "Internal Error Server."});
                let articlesSP = [];
                articles.forEach(article => {
                    let articleSP = {
                        id: article._id,
                        title: article.title,
                        description: article.description,
                        createdAt: article.createdAt,
                        avatar: article.avatar,
                        owner: article.owner.username,
                        bloggerAvatar: article.owner.avatar,
                    }
                    articlesSP.push(articleSP);
                });
                res.json({
                    articles: articlesSP,
                    total: count,
                    msg: "success",
                });

            });
    });

}






const getArticle = (req, res) => {
    console.log(req);
    Article.findOne({_id: req.query.id}).populate("owner").exec((err, article) => {
        if (err) return res.json({msg: "Internal Server Error."});
        console.log(article);
        fs.readFile(path.join(__dirname, "../../../../file/article/" + article._id.toString() + "\/" + article._id.toString() + ".model"), 'utf8', (err, data) => {
            if (err) return res.json({msg: "Internal Server Error."});
            return res.json({
                msg: "success",
                article: {
                    title: article.title,
                    id: article._id,
                    avatar: article.avatar,
                    bloggerAvatar: article.owner.avatar,
                    owner: article.owner.username,
                    createdAt: article.createdAt,
                    model: data,
                }
            });
        });
    });
}



module.exports = {
    getAllArticle,
    getArticle,
}
