const path = require('path');
const fs = require('fs');
const moveFile = require('move-file');
const Article = require('../../../models/Article');


const createArticle = (req, res) => {
    if (!req.fields.title || !req.fields.model || !req.files.avatar) return res.json({msg : "Bad Request."});
    let model = req.fields.model;
    const pattern = /([^\s]+\s+){0,20}/;
    model = model.replaceAll(/(\<[^\>]*\>)/g, " ").replaceAll(/\s{2,}/, " ").replaceAll(/^\s|\s$/, "");
    new Article({
        title: req.fields.title,
        owner: req.session.user._id,
        description: pattern.exec(model),
    }).save((err, article) => {
        if (err) return res.json({msg: "Internal Server Error."});
        (async () => {
            let model = req.fields.model;
            for (let i = 0; i < Object.entries(req.files).length; i++) {
                let [key, value] = Object.entries(req.files)[i];
                let imageFile = Date.now() + "-" + value.name;
                if (key === "avatar"){
                    const pattern = /\.\w+$/;
                    imageFile = "avatar" + pattern.exec(imageFile);
                }
                let tempPath = value.path;
                let targetPath = path.join(__dirname, "../../../../file/article/" + article._id.toString() + "/" + imageFile);
                await moveFile(tempPath, targetPath);
                model = model.replace(/\<img\ssrc\=\"blob\:\w+\:\/\/[^"]*\/[^"]*\"/, "\<img src\=\"\/article\/" + article._id.toString() + "\/" + imageFile + "\"");
            }
            fs.writeFileSync(path.join(__dirname, "../../../../file/article/" + article._id.toString() + ".model"), model);
            res.json({msg: "success"});
        })();
    });
};





const updateArticle = (req, res) => {
    if (!req.fields.title || !req.fields.model || !req.files.avatar) return res.json({msg : "Bad Request."});


    console.log(req.fields);
    console.log(req.files);


};





module.exports = {
    createArticle,
    updateArticle,
};
