const BlogPost = require("../models/blogPostModel");

exports.addPostService = async (user, data) => {
    const { title, content, tags, status } = data;
    const checkblogPost = await BlogPost.findOne({$and: [{user_id: user._id}, { title }]});

    if (checkblogPost) {
        return {
            status: 409,
            success: false,
            message: "User already exists",
            data: null,
        };
    }

    const blogPost = await BlogPost.create({
        user_id: user._id,
        title,
        content,
        tags,
        status,
    });
    if (!blogPost) {
        return {
            status: 401,
            success: false,
            message: "Unable to create blogpost.",
            data: null,
        };
    };

    return {
        status: 201,
        success: true,
        message: "Blog post created successfully",
        data: null,
    };
};

exports.userBlogPostsService = async (user) => {
    const blogPosts = await BlogPost.find({ user_id: user._id });
    return {
        status: 200,
        success: true,
        message: "User blog posts",
        data: blogPosts,
    };
};

exports.publicBlogPostsService = async () => {
    const blogPosts = await BlogPost.find({ status: "published" });
    return {
        status: 200,
        success: true,
        message: "Public blog posts",
        data: blogPosts,
    };
}

exports.updateUserBlogPostService = async (user, blogPostId, data) => {
    const { title, content, tags, status } = data;
    const blogPost = await BlogPost.findOne({ _id: blogPostId, user_id: user._id });
    if (!blogPost) {
        return {
            status: 404,
            success: false,
            message: "Blog post not found",
            data: null,
        };
    };

    blogPost.title = title;
    blogPost.content = content;
    blogPost.tags = tags;
    blogPost.status = status;
    await blogPost.save();

    return {
        status: 200,
        success: true,
        message: "Blog post updated successfully",
        data: null,
    };
};

exports.addCommentService = async (user, blogPostId, data) => {
    const blogPost = await BlogPost.findOne({ _id: blogPostId });
    if (!blogPost) {
        return {
            status: 404,
            success: false,
            message: "Blog post not found",
            data: null,
        };
    };

    blogPost.comments.push({
        user_id: user._id,
        comment: data.comment,
    });
    await blogPost.save();

    return {
        status: 200,
        success: true,
        message: "Comment added successfully",
        data: null,
    };
};