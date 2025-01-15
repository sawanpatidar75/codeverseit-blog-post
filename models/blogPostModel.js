const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['published', 'draft'],
        default: 'draft'
    }
},
    {
        timestamps: true,
    }
);

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;