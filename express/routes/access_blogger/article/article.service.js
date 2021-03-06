const path = require('path');
const fs = require('fs');
const moveFile = require('move-file');
const Article = require('../../../models/Article');
const Comment = require("../../../models/Comment");



const createArticle = (req, res) => {
    if (!req.fields.title || !req.fields.model || !req.files.avatar) return res.json({msg : "Bad Request."});
    let model = req.fields.model;
    const pattern = /([^\s]+\s+){0,20}/;
    const pattern2 = /\.\w+$/;
    model = model.replace(/(\<[^\>]*\>)/g, " ").replace(/\s{2,}/g, " ").replace(/^\s|\s$/g, "");
    new Article({
        title: req.fields.title,
        owner: req.session.user._id,
        description: pattern.exec(model).join(""),
        avatar: "avatar" + pattern2.exec(req.files.avatar.name),
    }).save((err, article) => {
        if (err) return res.json({msg: "Internal Server Error."});
        (async () => {
            let model = req.fields.model;
            for (let i = 0; i < Object.entries(req.files).length; i++) {
                let [key, value] = Object.entries(req.files)[i];
                let imageFile = Date.now() + "-" + value.name;
                if (key === "avatar") imageFile = "avatar" + pattern2.exec(imageFile);
                let tempPath = value.path;
                let targetPath = path.join(__dirname, "../../../../file/article/" + article._id.toString() + "/" + imageFile);
                await moveFile(tempPath, targetPath);
                model = model.replace(/\<img\ssrc\=\"blob\:\w+\:\/\/[^"]*\/[^"]*\"/, "\<img src\=\"\/article\/" + article._id.toString() + "\/" + imageFile + "\"");
            }
            try {
                fs.writeFileSync(path.join(__dirname, "../../../../file/article/" + article._id.toString() + "\/" + article._id.toString() + ".model"), model);
                return res.json({msg: "success"});
            } catch (e) {
                return res.json({msg: "Internal Server Error."});
            }
        })();
    });
};





const updateArticle = (req, res) => {
    if (!req.fields.title || !req.fields.model || !req.files.avatar || !req.fields.id) return res.json({msg : "Bad Request."});
    Article.find({_id: req.fields.id, owner: req.session.user._id}, (err, exist) => {
        if (!exist) return res.json({msg: "Can not find the article."});
        let model = req.fields.model;
        const pattern = /([^\s]+\s+){0,20}/;
        const pattern2 = /\.\w+$/;
        model = model.replace(/(\<[^\>]*\>)/g, " ").replace(/\s{2,}/g, " ").replace(/^\s|\s$/g, "");
        const update = {
            title: req.fields.title,
            owner: req.session.user._id,
            description: pattern.exec(model).join(""),
            avatar: "avatar" + pattern2.exec(req.files.avatar.name),
        }
        Article.findOneAndUpdate({_id: req.fields.id}, update, { new: true },(err, article) => {
            if (err) return res.json({msg: "Internal Server Error."});
            (async () => {
                try {
                    fs.rmdirSync(path.join(__dirname, "../../../../file/article/" + article._id.toString()), { recursive: true });
                    let model = req.fields.model;
                    for (let i = 0; i < Object.entries(req.files).length; i++) {
                        let [key, value] = Object.entries(req.files)[i];
                        let imageFile = Date.now() + "-" + value.name;
                        if (key === "avatar") imageFile = "avatar" + pattern2.exec(imageFile);
                        let tempPath = value.path;
                        let targetPath = path.join(__dirname, "../../../../file/article/" + article._id.toString() + "/" + imageFile);
                        await moveFile(tempPath, targetPath);
                        model = model.replace(/\<img\ssrc\=\"blob\:\w+\:\/\/[^"]*\/[^"]*\"/, "\<img src\=\"\/article\/" + article._id.toString() + "\/" + imageFile + "\"");
                    }
                    fs.writeFileSync(path.join(__dirname, "../../../../file/article/" + article._id.toString() + "\/" + article._id.toString() + ".model"), model);
                    return res.json({msg: "success"});
                } catch (e) {
                    return res.json({msg: "Internal Server Error."});
                }
            })();
        });
    });

    console.log(req.fields);
    console.log(req.files);


};




const getBloggerArticle = (req, res) => {
    Article.find({owner: req.session.user._id}, (err, articles) => {
        if (err) return res.json({msg: "Internal Server Error."});
        const articlesSP = [];
        articles.forEach(article => {
            articlesSP.push({
                avatar: ("/article/" + article._id + "/" + article.avatar),
                title: article.title,
                createdAt: article.createdAt,
                id: article._id,
            });
        });
        res.json({articles: articlesSP});
    });
}




const deleteArticle = (req, res) => {
    Article.find({_id: req.body.id, owner: req.session.user._id}, (err, article) => {
        if (err) return res.json({msg: "Internal Server Error."});
        if (!article) return res.json({msg: "This article doesn't exist."});
        Article.deleteOne({_id: req.body.id}, (err, article) => {
            if (err) return res.json({msg: "Internal Server Error."});
            Comment.deleteMany({article: req.body.id}, (err, comments) => {
                if (err) return res.json({msg: "Internal Server Error"});
                (async () => {
                    try {
                        fs.rmdirSync(path.join(__dirname, "../../../../file/article/" + article._id.toString()), {recursive: true});
                        res.json({msg: "success"});
                    } catch (e) {
                        return res.json({msg: "Internal Server Error."});
                    }
                })();
            });
        });
    });
}



module.exports = {
    createArticle,
    updateArticle,
    getBloggerArticle,
    deleteArticle,
};
