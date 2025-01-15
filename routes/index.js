const router = require('express').Router();

router.use('/user', require('./userRoutes'));
router.use('/blog', require('./blogPost'));

module.exports = router;