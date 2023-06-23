// core modules
const express = require('express');
// 3rd party module
const morgan = require('morgan');
// our own modules
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// core middleware
app.use(express.json());
// 3rd party middleware
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Adding route for static file using express builtin middleware
app.use(express.static(`${__dirname}/starter/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// mounting Routers on the two different routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handle those routers not handled
// app.get(): for get req, req.post(): for post req, similarly req.all(): is for all the methods.
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
