const { check, validationResult } = require('express-validator')

const blogValidator = {
    blogPostValidate: [
        check('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required.')
            .isString()
            .isLength({ min: 2, max: 200 })
            .withMessage('Title should be between 2 and 200 characters.'),
        check('content')
            .trim()
            .notEmpty()
            .withMessage('Content is required.')
            .isString()
            .isLength({ min: 2, max: 2000 })
            .withMessage('Title should be between 2 and 2000 characters.'),
        check('status')
            .trim()
            .notEmpty()
            .withMessage('Status is required.')
            .isString()
            .isIn(['published', 'draft'])
            .withMessage('Status should be published or draft.'),
        ],

    blogPostReqValid: (req, res, next) => {
        const error = validationResult(req)
        if (error.array().length > 0) {
            return res.status(400).json({ message: `Validation Error: ${error.array()[0].msg}`, data: null });
        }
        next()
    },
}

module.exports = blogValidator
