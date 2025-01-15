const mongoose = require('mongoose');

const blogPostCommentsSchema = new mongoose.Schema({
    blog_post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogPost",
    },
    comment_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    comment: {
        type: String,
        required: true
    },

},
    {
        timestamps: true,
    });

const BlogPostComments = mongoose.model('BlogPostComments', blogPostCommentsSchema);

module.exports = BlogPostComments;