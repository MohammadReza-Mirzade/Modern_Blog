const express = require('express');
const router = express.Router();
const Blogger = require('../../models/Blogger');
const bcrypt = require('bcrypt')

router.put('/', (req, res) => {
    if(req.body.password && req.body.newPassword) {
        if (req.body.username.trim().length > 30) return res.json({msg: "Username length must be less than 30 characters."});
        if (req.body.password.trim().length > 30 || req.body.password.trim().length < 8) return res.json({msg: "Password length must be between 30 characters and 8 characters."});
        Blogger.findOne({_id: req.session.user._id}, (err, blogger) => {
            bcrypt.compare(req.body.password.trim(), blogger.password, async function (err, isMatch) {
                if (err) {
                    console.log(err);
                    return res.json({msg: 'Internal Server Error.'});
                }
                ;

                if (!isMatch) return res.json({msg: 'Password is wrong.'});
                // if (req.body.password.trim() !== blogger.password) return res.json({msg: 'Password is wrong.'});
                const password = await bcrypt.hashSync(req.body.newPassword, 10);
                Blogger.updateOne({_id: req.session.user._id}, {$set: {password: password}}, (err, blogger) => {
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
        return res.json({msg: "Bad Request."});
    }
});




router.get("/logout", (req, res) => {
    req.session.destroy();
    req.session = null;
    return res.json("success");
});


module.exports = router;
