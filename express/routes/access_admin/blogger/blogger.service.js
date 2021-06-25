const Blogger = require("../../../models/Blogger");
const Article = require("../../../models/Article");
const Comment = require("../../../models/Comment");
const fs = require('fs');
const path = require('path');




getAllBloggers = (req, res) => {
    Blogger.find({}, (err, bloggers) => {
        if (err) return res.json({msg: "Internal Server Error"});
        const bloggersSP = [];
        bloggers.forEach(blogger => {
            bloggersSP.push({
                key: blogger._id,
                username: blogger.username,
                firstName: blogger.firstName,
                lastName: blogger.lastName,
                gender: blogger.gender,
                mobileNumber: blogger.mobileNumber,
                avatar: ("/images/avatars/" + blogger.avatar),
                createdAt: blogger.createdAt,
            });
        });
        res.json({bloggers: bloggersSP});
    });
};




deleteBlogger = (req, res) => {
    Blogger.deleteOne({_id: req.body.id}, (err, blogger) => {
        if (err) return res.json({msg: "Internal Server Error"});
        Article.find({owner: req.body.id}, (err, articles) => {
            articles.forEach((article) => {
                Comment.deleteMany({article: article._id}, (err, comments) => {
                    if (err) return res.json({msg: "Internal Server Error."});
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
            Comment.deleteMany({owner: req.body.id}, (err, comments) => {
                if (err) return res.json({msg: "Internal Server Error."});
            });
        });
        Article.deleteMany({owner: req.body.id}, (err, articles) => {
            if (err) return res.json({msg: "Internal Server Error"});
            res.json({msg: "success"});
        });
    });
}



const changePassword = (req, res) => {
    Blogger.findOne({_id: req.body.id}, async (err, blogger) => {
        const password = await bcrypt.hashSync(blogger.mobileNumber, 10);
        Blogger.updateOne({_id: req.session.user._id}, {$set: {password: password}}, (err) => {
            if (err) {
                console.log(err);
                return res.json({msg: "Internal Server Error."});
            }
            return res.json({msg: "success"});
        });
    });
}



module.exports = {
    getAllBloggers,
    deleteBlogger,
    changePassword,
};
