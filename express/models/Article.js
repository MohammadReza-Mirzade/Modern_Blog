const mongoose = require('mongoose');
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
    description:{
        ...defaultStringSchema,
    },
    owner:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Blogger'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Article', ArticleSchema);
