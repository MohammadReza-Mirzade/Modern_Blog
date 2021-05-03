const express = require('express');
const router = express.Router();
const formidableMiddleware = require('express-formidable');
const bcrypt = require('bcrypt');
const User = require('../../models/Blogger');
const validator = require('validator');
const path = require("path");
const mv = require("mv");

router.post('/signup', formidableMiddleware(), (req, res) => {

    if (!req.fields.username || !req.fields.password || !req.fields.firstName || !req.fields.lastName || !req.fields.gender || !req.fields.mobileNumber || !req.files.avatar) return res.json({msg: "Bad Request."});
    if (!req.fields.firstName.trim()) return res.json({msg: "FirstName field is empty."});
    if (!req.fields.lastName.trim()) return res.json({msg: "LastName field is empty."});
    if (!req.files.avatar.name.match(/\.(jpg|jpeg|png)$/)) return res.json({msg: "Avatar format must be png jpg or jpeg"});
    if (!validator.isLength(req.fields.username.trim() , {min:1, max:30}) || !(validator.isAlphanumeric(req.fields.username.trim(), 'fa-IR') ^ validator.isAlphanumeric(req.fields.username.trim(), 'en-AU'))) return res.json({msg: "Username must consist english letters only or persian letters only and its length must be less than 30 characters."});
    if (!validator.isLength(req.fields.password, {min: 8, max: 30})) return res.json({msg: "Password length must be between 30 characters and 8 characters."});
    if (!validator.isMobilePhone(req.fields.mobileNumber, 'fa-IR')) return res.json({msg: "MobileNumber value isn't valid."});
    if (!(req.fields.gender === 'man' || req.fields.gender === 'woman' || req.fields.gender === "other")) return res.json({msg: "Gender value isn't valid."});


    User.findOne({username: req.fields.username.trim()}, (err, existUser) => {
        if (err) return res.json({msg: "Internal Server Error."});


        if (existUser) {
            return res.json({msg: "This User Name has already been used."});
        }

        const avatarFile = Date.now() + "-" + req.files.avatar.name;
        const tempPath = req.files.avatar.path ;
        const targetPath = path.join(__dirname, "../../../file/images/avatars/" + avatarFile);

        mv(tempPath, targetPath, {mkdirp: true},err => {
            console.log(targetPath);
            if (err) return res.json({msg: "Internal Server Error."});

            new User({
                username: req.fields.username,
                password: req.fields.password,
                firstName: req.fields.firstName,
                lastName: req.fields.lastName,
                gender: req.fields.gender,
                mobileNumber: req.fields.mobileNumber,
                avatar: avatarFile,
            }).save(err => {
                if (err) return res.json({msg: "Internal Server Error."});

                return res.json({msg: "success"});
            });
        });
    });
});



router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) return res.json({msg: "Bad request."});

    User.findOne({username: req.body.username}, (err, user) => {
        if (err) return res.json({msg: "Internal Server Error."});
        if (!user) return res.json({msg: "Username or Password is wrong."});

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (err) return res.json({msg: "Internal Server Error."});
            if (!isMatch) return res.json({msg: 'Username or Password is wrong.'});
            req.session.user = user;
            res.json({msg: 'success'});
        });
    });
});



router.post('/checkUsername', (req, res) => {
    if (!req.body.username) return res.json({msg: "Bad request."});
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) return res.json({msg: "Internal Server Error."});
        if (user) return res.json({msg: "Username is already exist."});
        res.json({msg: 'ok'});
    });
});




router.post("/createAdmin", (req, res) => {
    User.findOne({role: "admin"}, (err, user) => {
        if (user || err) return res.status(404).json({msg: "Page not found."});
        if (!req.fields.username || !req.fields.password || !req.fields.firstName || !req.fields.lastName || !req.fields.gender || !req.fields.mobileNumber || !req.files.avatar) return res.json({msg: "Bad Request."});
        if (!req.fields.firstName.trim()) return res.json({msg: "FirstName field is empty."});
        if (!req.fields.lastName.trim()) return res.json({msg: "LastName field is empty."});
        if (!req.files.avatar.name.match(/\.(jpg|jpeg|png)$/)) return res.json({msg: "Avatar format must be png jpg or jpeg"});
        if (!validator.isLength(req.fields.username.trim() , {min:1, max:30}) || !(validator.isAlphanumeric(req.fields.username.trim(), 'fa-IR') ^ validator.isAlphanumeric(req.fields.username.trim(), 'en-AU'))) return res.json({msg: "Username must consist english letters only or persian letters only and its length must be less than 30 characters."});
        if (!validator.isLength(req.fields.password, {min: 8, max: 30})) return res.json({msg: "Password length must be between 30 characters and 8 characters."});
        if (!validator.isMobilePhone(req.fields.mobileNumber, 'fa-IR')) return res.json({msg: "MobileNumber value isn't valid."});
        if (!(req.fields.gender === 'man' || req.fields.gender === 'woman' || req.fields.gender === "other")) return res.json({msg: "Gender value isn't valid."});

        const avatarFile = Date.now() + "-" + req.files.avatar.name;
        const tempPath = req.files.avatar.path ;
        const targetPath = path.join(__dirname, "../../../file/images/avatars/" + avatarFile);

        mv(tempPath, targetPath, {mkdirp: true},err => {
            console.log(targetPath);
            if (err) return res.json({msg: "Internal Server Error."});

            new User({
                username: req.fields.username,
                password: req.fields.password,
                firstName: req.fields.firstName,
                lastName: req.fields.lastName,
                gender: req.fields.gender,
                mobileNumber: req.fields.mobileNumber,
                avatar: avatarFile,
            }).save(err => {
                if (err) return res.json({msg: "Internal Server Error."});
                return res.json({msg: "success"});
            });
        });

    });
});



module.exports = router;
