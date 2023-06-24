const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // this only works on CREATE and SAVE!! doesn't work on updating the password
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password mismatched',
        },
    },
});

// pre-save middleware: happens between the moment when we receive the data and it is persisted to the DB.
// encrypt the password when the password field has been updated: update pass or signup
userSchema.pre('save', async function (next) {
    // we have builtin function isModified for each of the field on a document
    if (!this.isModified('password')) return next();

    //  Using bcrypt for hashing the password
    // TODO read about bcrypt
    // here 12 is the cost parameter(instead of manually generating salt and pass it to the hash function, we can just pass a cost parameter)
    this.password = await bcrypt.hash(this.password, 12);

    // once the validation has been done then we don't need passwordConfirm.
    this.passwordConfirm = undefined;
});

// candidatePassword: that user enter to login
// userPassword: once used during signup saved in the DB
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
