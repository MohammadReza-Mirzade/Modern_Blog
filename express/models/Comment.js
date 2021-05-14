const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const defaultStringSchema = {
    type: String,
    required: true,
    trim: true,
}


const CommentSchema = new Schema({
    text:{
        ...defaultStringSchema,
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
