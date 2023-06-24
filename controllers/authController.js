const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require(`${__dirname}/../utils/catchAsync`);

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // TODO: jwt https://github.com/auth0/node-jsonwebtoken
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    });
});
