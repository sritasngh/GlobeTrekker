const Tour = require('../models/tourModel');

// checking a checkBody middleware
// check if body contains the name and price property
// If not, send back 400(bad request) status
// Add it to the post handler stack

exports.checkBody = (req, res, next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price',
        });
    }
    next();
};

// Route handlers or controllers
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours,
        // },
    });
};

exports.getTour = (req, res) => {
    const id = req.params.id * 1;
    // const tour = tours.find((el) => el.id === id);
    // res.status(200).json({
    //     status: 'success',
    //     // results: tours.length,
    //     data: {
    //         tour,
    //     },
    // });
};

exports.createTour = (req, res) => {
    res.status(201).json({
        status: 'success',
        // data: {
        //     tour: newTour,
        // },
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
