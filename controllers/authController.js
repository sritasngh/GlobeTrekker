// node has this builtin function to promisifying a function which is there in the utils module
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // TODO: jwt https://github.com/auth0/node-jsonwebtoken
    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    // 2) check if user exits && password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token,
    });
});

// will run to validate user whenever there is any request from an user
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check if it's there
    // A common practice is to send a token using an http header with the request
    let jwToken = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        jwToken = req.headers.authorization.split(' ')[1];
    }
    // console.log(jwToken);
    if (!jwToken)
        return next(
            new AppError(
                'You are not logged in! Please login to get access',
                401
            )
        );
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
        jwToken,
        process.env.JWT_SECRET
    );
    // console.log(decoded);
    // TODO: Implement these checks to provide extra security
    // 3) Check if user still exists
    // 4) check if user changed password after JWT had been issued
    const currentUser = await User.findById(decoded.id);
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.restrictTo =
    (...roles) =>
    (req, res, next) => {
        // roles ["admin", "lead-guide"], role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            );
        }
        next();
    };
