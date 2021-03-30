const url = require('url');
const generalTools = {};

generalTools.notFound = function(req, res){
    return res.redirect("/");
};

generalTools.sessionChecker = function(req, res) {
    if (req.cookies.user_sid && req.session.user) {
        return res.json({msg: 'ok', id: req.session.user._id});
    } else {
        return res.json({msg: 'no'});
    }
};

generalTools.bloggerLoginChecker = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect(url.format({
            pathname:"/api/auth/loginPage",
            query: {
                "msg": 'Please Login :('
            }
        }));
    };

    return next()
};



module.exports = generalTools;
