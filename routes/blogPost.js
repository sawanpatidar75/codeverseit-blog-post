const { userBlogPostsController, publicBlogPostsController, updateUserBlogPostController, addCommentController, addPostController } = require('../controllers/blogPostController');
const { authenticate } = require('../middlewares/auth');
const { blogPostValidate, blogPostReqValid } = require('../middlewares/blogPostValidater');

const router = require('express').Router();

router.get('/add-post', authenticate, blogPostValidate, blogPostReqValid, addPostController);
router.get('/add-post', authenticate, userBlogPostsController);
router.get('/add-post', authenticate, publicBlogPostsController);
router.get('/add-post', authenticate, updateUserBlogPostController);
router.get('/add-post', authenticate, addCommentController);

module.exports = router;
