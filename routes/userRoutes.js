const { registerController, loginController, profileController, updateProfileController } = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');
const { userValidate, userReqValid, userLoingValidate, userUpdateValidate } = require('../middlewares/userValidater');

const router = require('express').Router();

router.post('/register', userValidate, userReqValid, registerController);
router.post('/login', userLoingValidate, userReqValid, loginController);
router.get('/profile', authenticate, profileController);
router.get('/update-profile', authenticate, userUpdateValidate, userReqValid, updateProfileController);

module.exports = router;
