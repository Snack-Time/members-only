const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render("sign-up", { title: 'Sign Up' })
});

exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: User Create Post")
});

exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create Get")
});

exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Message Create Post")
});