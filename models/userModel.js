const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, confirm pass
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name!'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address!'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // this only works on CREATE and SAVE!! doesn't work on updating the password
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password mismatched'
        }
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
