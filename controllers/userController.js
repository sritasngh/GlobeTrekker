const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

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
