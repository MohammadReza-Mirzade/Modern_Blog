
const update = (req, res, next) => {
    if(req.body.password && req.body.newPassword) {
        if (req.body.password.trim().length > 30 || req.body.password.trim().length < 8) return res.json({msg: "Password length must be between 30 characters and 8 characters."});
        Blogger.findOne({_id: req.session.user._id}, (err, blogger) => {
            bcrypt.compare(req.body.password.trim(), blogger.password, async function (err, isMatch) {
                if (err) {
                    console.log(err);
                    return res.json({msg: 'Internal Server Error.'});
                }


                if (!isMatch) return res.json({msg: 'Password is wrong.'});
                const password = await bcrypt.hashSync(req.body.newPassword, 10);
                Blogger.updateOne({_id: req.session.user._id}, {$set: {password: password}}, (err) => {
                    if (err) {
                        console.log(err);
                        return res.json({msg: "Internal Server Error."});
                    }
                    return res.json({msg: "success"});
                });
            });
        });
    } else /*if (req.body.firstName || req.body.lastName || req.body.gender || req.body.mobileNumber)*/ {

        if (!req.body.firstName.trim()) return res.json({msg: "FirstName field is empty."});
        if (!req.body.lastName.trim()) return res.json({msg: "LastName field is empty."});
        if (!validator.isMobilePhone(req.body.mobileNumber, 'fa-IR')) return res.json({msg: "MobileNumber value isn't valid."});
        if (!(req.body.gender === 'man' || req.body.gender === 'woman' || req.body.gender === "other")) return res.json({msg: "Gender value isn't valid."});

        Blogger.findOne({_id: req.session.user._id}, (err, blogger) => {
            if (err) {
                console.log(err);
                return res.json({msg: 'Internal Server Error.'});
            }

            Blogger.updateOne({_id: req.session.user._id}, {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobileNumber: req.body.mobileNumber,
                    gender: req.body.gender
                }
            }, (err) => {
                if (err) {
                    console.log(err);
                    return res.json({msg: "Internal Server Error."});
                }
                return res.json({msg: "success"});
            });
        });
    }
};








const updateAvatar = (req, res) => {

};






const logout = (req, res) => {
    req.session.destroy();
    req.session = null;
    return res.json({msg: "success"});
};




module.exports = {
    update,
    updateAvatar,
    logout
};