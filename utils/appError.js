// Inheriting express Error class
// operational error: that might occur in the future.
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // status depends on statusCode, if statusCode is 400 fail, 500 means it's going to be an error. i.e, all failure starts with 4 and error starts with 5.
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        /*
        Error.capturestackTrace, so exactly what you get here, and at first we need to specify the current object, which is this, and then the AppError class itself, which is gonna be this.constructor. Okay, and so this way when a new object is created, and a constructor function is called, then that function call is not gonna appear in the stack trace, and will not pollute it.
        */
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;