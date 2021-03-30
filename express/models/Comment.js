const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const defaultStringSchema = {
    type: String,
    required: true,
    trim: true,
}


const CommentSchema = new Schema({
    title: {
        ...defaultStringSchema,
        minlength: 3,
        maxlength: 30
    },
    text:{
        ...defaultStringSchema,
        minlength: 3,
        maxlength: 30
    },
    lastUpdate:{
        type: Date,
        default: Date.now()
    },
    owner:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    article:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Comment', CommentSchema);
