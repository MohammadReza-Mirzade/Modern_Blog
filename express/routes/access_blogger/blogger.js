const express = require('express');
const router = express.Router();
const Blogger = require('../../models/Blogger');
const bcrypt = require('bcrypt')
const path = require('path');
const formidableMiddleware = require('express-formidable');

router.put('/', (req, res, next) => {
    if(req.body.password && req.body.newPassword) {
        if (req.body.username.trim().length > 30) return res.json({msg: "Username length must be less than 30 characters."});
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
    } else if (req.body.firstName || req.body.lastName || req.body.gender || req.body.mobileNumber) {

    } else {
        next();
    }
});


router.put("/updateAvatar", formidableMiddleware(),(req, res) => {

});


router.get("/logout", (req, res) => {
    req.session.destroy();
    req.session = null;
    return res.json({msg: "success"});
});


module.exports = router;
