const Comment = require("./../../../models/Comment");




getAllComments = (req, res) => {
    Comment.find({}).populate("owner").populate("article").exec((err, comments) => {
        if (err) return res.json({msg: "Internal Server Error"});
        const commentsSP = [];
        comments.forEach((comment) => {
            commentsSP.push({
                key: comment.id,
                owner: comment.owner.username,
                article: comment.article._id,
                text: comment.text,
                createdAt: comment.createdAt,
            });
        });
        res.json({comments: commentsSP});
    });
};




deleteComment = (req, res) => {
    Comment.deleteOne({_id: req.body.id}, (err, comment) => {
        if (err) return res.json({msg: "Internal Server Error."});
        res.json({msg: "success"});
    })
}




module.exports = {
    getAllComments,
    deleteComment,
};
