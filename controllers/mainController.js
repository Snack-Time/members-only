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
    const message = req.session.messages || [];
    req.session.messages = [];

    res.render('log-in', {
        title: "Log In",
        message: message[0],
    })
})

exports.user_log_in_post =
    passport.authenticate("local", { 
        successRedirect: "/", 
        failureRedirect: "/log-in",
        failureMessage: true,
    })

// Update User to Member status

exports.user_update_get = asyncHandler(async (req, res, next) => {
    res.render('update-user', { title: 'Update User', user: req.user })
});

exports.user_update_post = [
    body('acknowledgehim', 'You have not acknowledged your Tribal Chief.')
    .isString()
    .trim()
    .matches('I Acknowledge Roman Reigns'),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        console.log(errors)
        if (!errors.isEmpty()) {
            res.render('update-user', {
                title: 'Acknowledge Him.',
                errors: errors.array(),
                user: req.user,
            })
            return
        }
        else {
            const updatedUser = new User({
                username: req.user.username,
                password: req.user.password,
                _id: req.user.id,
                status: "Member"
                })
            await User.findByIdAndUpdate(req.user.id, updatedUser)
            res.redirect('/')
            }
        }
    )
]

// Post Message

exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.render('post-msg', { title: 'Create Message', user: req.user })
});

exports.message_create_post = [
    body('content', 'Message cannot be blank!')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 1 }),
    
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const msg = new Message({
            content: req.body.content,
            original_poster: req.user,
        })

        console.log(errors)
        if (!errors.isEmpty()) {
            res.render('post-msg', {
                title: 'Create Message',
                errors: errors.array(),
                user: req.user,
            })
            return
        }
        else {
            await msg.save();
            res.redirect('/')
            }
        }
    )
]