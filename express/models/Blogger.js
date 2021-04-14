const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const defaultStringSchema = {
    type: String,
    required: true,
    trim: true,
}


const BloggerSchema = new Schema({
    username: {
        ...defaultStringSchema,
        unique: true,
        lowercase: true,
        maxlength: 30
    },
    avatar: {
        ...defaultStringSchema,
    },
    firstName:{
        ...defaultStringSchema,
    },
    lastName:{
        ...defaultStringSchema,
    },
    password: {
        ...defaultStringSchema,
        minlength: 8,
        maxlength:30
    },
    gender:{
        type: String,
        required: true,
        enum: ['man', 'woman', 'other'],
    },
    mobileNumber:{
        ...defaultStringSchema,
    },
    lastUpdate:{
        type: Date,
        default: Date.now()
    },
    role:{
        type: String,
        enum: ['admin', 'blogger'],
        default: 'blogger',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});


BloggerSchema.pre('save', function(next) {
    const user = this;
    if (this.isNew || this.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    };
});

module.exports = mongoose.model('Blogger', BloggerSchema);
