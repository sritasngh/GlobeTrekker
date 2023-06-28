const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
// controllers
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) create error if user posts password data
    if (req.body.password || req.body.passwordConfirm)
        return next(
            new AppError('This route is not for password updates, ', 400)
        );

    // 2) Update user document
    // filtered out unwanted fields names that were not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            updatedUser,
        },
    });
});

exports.getUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented',
    });
};

exports.createUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented',
    });
};

exports.updateUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented',
    });
};

exports.deleteUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented',
    });
};
