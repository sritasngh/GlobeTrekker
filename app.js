// core modules
const fs = require('fs');
const express = require('express');
// 3rd party module
const morgan=require('morgan');


const app = express();


// core middleware
app.use(express.json());

// 3rd party middleware
app.use(morgan('dev'));

// Creating our own middleware
app.use((req, res, next)=>{
    console.log('Hello from the middleware!');
    next();
});

app.use((req, res, next)=>{
    req.requestTime=new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`, 'utf-8'));
// console.log(tours);

// Route handlers or controllers
const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestTime: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        data: {
            tour
        }
    });
}


const createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
}

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here...>'
        }
    });
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
}

const getAllUsers = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented'
    });
};

const getUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented'
    });
}


const createUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented'
    });
}

const updateUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented'
    });
}

const deleteUser = (req, res) => {
    res.status(400).json({
        status: 'error',
        requestTime: req.requestTime,
        message: 'This route handler is not yet implemented'
    });
}

// Routes
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);



app
    .route('/api/v1/Users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app
    .route('/api/v1/Users')
    .get(getAllUsers)
    .post(createUser);

app
    .route('/api/v1/Users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

// start server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port:${port}...`);
})