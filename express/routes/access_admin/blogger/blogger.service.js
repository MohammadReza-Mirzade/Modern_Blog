const Blogger = require("./../../../models/Blogger");




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
        res.json({msg: "success"});
    })
}




module.exports = {
    getAllBloggers,
    deleteBlogger,
};
