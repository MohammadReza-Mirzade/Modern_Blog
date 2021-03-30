const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/Blogger');
const validator = require('validator');



router.post('/signup', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.gender || !req.body.mobileNumber || !req.body.avatar) return res.json({msg: "Bad Request."});
    if (!req.body.firstName.trim()) return res.json({msg: "FirstName field is empty."});
    if (!req.body.lastName.trim()) return res.json({msg: "LastName field is empty."});
    if (!req.body.avatar.trim()) return res.json({msg: "Avatar field is empty."});
    if (!validator.isLength(req.body.username.trim() , {min:1, max:30}) || !(validator.isAlphanumeric(req.body.username.trim(), 'fa-IR') ^ validator.isAlphanumeric(req.body.username.trim(), 'en-AU'))) return res.json({msg: "Username must consist english letters only or persian letters only and its length must be less than 30 characters."});
    if (!validator.isLength(req.body.password, {min: 8, max: 30}) || !validator.isStrongPassword(req.body.password.trim(), {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) return res.json({msg: "Password length must be between 30 characters and 8 characters."});
    if (!validator.isMobilePhone(req.body.mobileNumber, 'fa-IR')) return res.json({msg: "MobileNumber value isn't valid."});
    if (!(req.body.gender === 'man' || req.body.gender === 'woman')) return res.json({msg: "Gender value isn't valid."});
    User.findOne({username: req.body.username.trim()}, (err, existUser) => {
        if (err) {
            return res.json({msg: "Internal Server Error."});
        };

        if (existUser) {
            return res.json({msg: "This User Name has already been used."});
        };

        new User({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender === 'man',
            mobileNumber: req.body.mobileNumber,
        }).save(err => {
            if (err) {
                return res.json({msg: "Internal Server Error."});
            }

            return res.json({msg: "success"});
        });
    });
});



router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) return res.json({msg: "Req"});

    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return res.json({msg: "Internal Server Error."});
        };
        if (!user) return res.json({msg: "Username or Password is wrong."});

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (err) {
                return res.json({msg: "Internal Server Error."});
            };
            if (!isMatch) return res.json({msg: 'Username or Password is wrong.'});
            req.session.user = user;
            res.json({msg: 'success'});
        });
    });
});



module.exports = router;
