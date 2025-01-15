const { check, validationResult } = require('express-validator')

const validator = {
    userValidate: [
        check('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required.')
            .isString()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name should be between 2 and 50 characters.'),
        check('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email address.'),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required.')
            .isString()
            .isStrongPassword()
            .withMessage('Please enter valid strong password.'),
    ],
    userLoingValidate: [
        check('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email address.'),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required.')
            .isString()
            .isStrongPassword()
            .withMessage('Please enter valid strong password.'),
    ],
    userUpdateValidate: [
        check('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required.')
            .isString()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name should be between 2 and 50 characters.'),
        check('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email address.'),
    ],

    userReqValid: (req, res, next) => {
        const error = validationResult(req)
        if (error.array().length > 0) {
            return res.status(400).json({ message: `Validation Error: ${error.array()[0].msg}`, data: null });
        }
        next()
    },
}

module.exports = validator
