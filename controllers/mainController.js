const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("sign-up", { title: 'Sign Up' })
});

exports.user_create_post = [
    body('username', 'Username must be at least 3 characters!')
    .trim()
    .isLength({ min: 3 })
    .escape(),
    body('username', 'Username already in use!')
    .custom(async value => {
        const user = await User.find({ name: req.body.username })
    }),
    body('password', 'Password must be at least 5 characters!')
    .trim()
    .isLength({ min: 5 })
    .escape(),
    body('confirmpassword', 'Password must match!')
    .custom((value, { req }) => {
        return value === req.body.password;
    }),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            res.render('sign-up', {
                title: 'Sign Up',
                errors: errors.array()
            })
            return
        }
        else {
            res.redirect('/')
        }
})];

exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create Get")
});

exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create Post")
});