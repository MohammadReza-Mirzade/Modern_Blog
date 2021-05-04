const Article = require("../../../models/Article");



const getAllArticle = (req, res) => {

    Article.find({}, )
        .populate("owner")
        // .select({})
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
                        bloggerAvatar: article.owner.avatar,
                        owner: article.owner.username,
                    }
                });
                console.log(articles);
                res.json({
                    articles: articles,
                    total: count,
                    msg: "success",
                });

            });
    });

}



module.exports = {
    getAllArticle,
}
