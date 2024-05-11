const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const passport = require('passport')
const session = require('express-session')


// ---User Functions---

// CREATE USER

exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("sign-up", { title: 'Sign Up' })
});

exports.user_create_post = [
    body('username', 'Username must be at least 3 characters!')
    .trim()
    .isLength({ min: 3 })
    .custom(async value => {
        const user = await User.findOne({ username: `${value}` }).exec()
        console.log(user)
        if (user) {
            throw new Error('Username already in use!')
        }
    })
    .escape(),

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
            bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err) {
                    return next(err)
                }
                try {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                    });
                    const result = await user.save();
                    res.redirect('log-in')
                }
                catch(err) {
                    return next(err)
                }
            })
        }
})];

// Log In User

exports.user_log_in_get = asyncHandler(async (req, res, next) => {
    res.render('log-in', { title: "Log In", message: req.flash('message') })
})

exports.user_log_in_post =
    passport.authenticate("local", { 
        successRedirect: "/", 
        failureRedirect: "/log-in",
        failureFlash: true,
    })

exports.user_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User Update Get")
});

exports.user_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User Update Post")
});

exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create Get")
});

exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create Post")
});