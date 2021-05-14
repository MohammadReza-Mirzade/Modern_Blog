const Comment = require("./../../../models/Comment");



getAllComments = (req, res) => {
    Comment.find({article: req.query.id}).populate("owner").exec((err, comments) => {
        if (err) return res.json({msg: "Internal Server Error."});
        const commentsSP = [];
        comments.forEach(comment => {
            commentsSP.push({
                author: comment.owner.username,
                avatar: "/images/avatars/" + comment.owner.avatar,
                content: comment.text,
                datetime: comment.createdAt,
            });
        });
        res.json({msg: "success", comments: commentsSP});
    });
};



createNewComment = (req, res) => {
    if (!req.body.text || !req.body.article) return res.json({msg: "Bad Request."});
    if (!req.session.user) return res.json({msg: "First Login."});
    new Comment({
        text: req.body.text,
        owner: req.session.user._id,
        article: req.body.article,
    }).save(((err, comment) => {
        if (err) return res.json({msg: "Internal Server Error."});
        return res.json({msg: "success"});
    }));
};



module.exports = {
    createNewComment,
    getAllComments,
}
