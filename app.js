// core modules
const express = require('express');
// 3rd party module
const morgan=require('morgan');
// our own modules
const tourRouter=require('./routes/tourRoutes');
const userRouter=require('./routes/userRoutes');

const app = express();


// core middleware
app.use(express.json());
// 3rd party middleware
app.use(morgan('dev'));


// Adding route for static file using express builtin middleware
app.use(express.static(`${__dirname}/starter/public`));


// Creating our own middleware
app.use((req, res, next)=>{
    console.log('Hello from the middleware!');
    next();
});

app.use((req, res, next)=>{
    req.requestTime=new Date().toISOString();
    next();
});

// mounting Routers on the two different routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;