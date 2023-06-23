const Tour = require('../models/tourModel');

// Route handlers or controllers
exports.getAllTours = async (req, res) => {
    try {
        // on doing this there won't be any scope of sorting, pagination or performing any operation on the query in the future, so we use other approach.
        // const tours = await Tour.find(req.query);

        // BUILD QUERY
        // 1A)Filtering
        const queryObj = { ...req.query };
        const execludeFields = ['page', 'sort', 'limit', 'fileds'];
        execludeFields.forEach((el) => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b{gte|gt|lte|lt}\b/g,
            (match) => `$${match}`
        );
        let query = Tour.find(JSON.parse(queryStr));

        // 2) Sorting
        if (req.query.sort) {
            // Incase of more than one sorting parameter put , in the API query and mongoose use space to separate multiple sorting parameters
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        // 3) Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        // 4) Pagination
        if (req.query.page) {
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 100;
            const skip = (page - 1) * limit;

            // page=3&limit=10, page1:1-10, page2:11-20, page3:21:30
            const numTours = await Tour.countDocuments();
            if (skip > numTours) throw new Error('This page does not exist');
            else query = query.skip(skip).limit(limit);
        }

        // EXECUTE QUERY
        const tours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            requestTime: req.requestTime,
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        // create method will be called directly on the model
        // create method will return a promise
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            // new:true will return the updated document
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            message: 'deleted successfully!',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
