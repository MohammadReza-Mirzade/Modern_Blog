const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const defaultStringSchema = {
    type: String,
    required: true,
    trim: true,
}

const ArticleSchema = new Schema({
    title: {
        ...defaultStringSchema,
    },
    file:{
        ...defaultStringSchema,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', ArticleSchema);
