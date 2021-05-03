const generalTools = {};

generalTools.notFound = function(req, res){
    return res.redirect("/404");
};

generalTools.sessionChecker = function(req, res) {
    if (req.cookies.user_sid && req.session.user) {
        return res.json({msg: 'ok', id: req.session.user._id});
    } else {
        return res.json({msg: 'no'});
    }
};

generalTools.sessionFalse = function (req, res, next) {
    if (req.cookies.user_sid && req.session.user) return res.json({msg: "session"});
    return next();
}

generalTools.sessionBlogger = function (req, res, next) {
    if (!(req.cookies.user_sid && req.session.user)) return res.json({msg: "session"});
    return next();
};

generalTools.sessionAdmin = function (req, res, next) {
    if (!(req.cookies.user_sid && req.session.user) || req.session.user.role !== "admin") return res.status(404);
    return next();
}

generalTools.frontSession = function (req, res, next) {
    if (req.cookies.user_sid && req.session.user) {
        console.log(req);
    } else {
        console.log(req);
    }
    return next();
}

module.exports = generalTools;
