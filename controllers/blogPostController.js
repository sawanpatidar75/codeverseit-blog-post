const { addPostService, userBlogPostsService, publicBlogPostsService, updateUserBlogPostService, addCommentService } = require("../services/blogPostService.js");
const {  } = require("../services/userService.js");

exports.addPostController = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const response = await addPostService(user, body);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.userBlogPostsController = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const response = await userBlogPostsService(user, body);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.publicBlogPostsController = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const response = await publicBlogPostsService(user, body);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.updateUserBlogPostController = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const response = await updateUserBlogPostService(user, body);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.addCommentController = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const response = await addCommentService(user, body);

    const { success, message, status, data } = response;
    if (success) {
      return res.status(status).json({ message, data });
    } else {
      return res.status(status).json({ message, data });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
