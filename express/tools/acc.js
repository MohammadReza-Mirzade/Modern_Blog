const acc = {};

acc.adminManager = (req, res, next) => {
    if (req.session.user.role !== "admin") return res.status(404);
    return next();
};

acc.bloggerManager = (req, res, next) => {
    if (req.session.user.role !== "blogger" && req.session.user.role !== "admin") return res.status(403).json({msg: "session"});
    return next();
};

module.exports = acc;
