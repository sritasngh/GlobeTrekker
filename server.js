const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection successful!');
    });

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
});

const Tour = mongoose.model('Tour', tourSchema);

// like creating new object out of a class, this testTour is an instance of the Tour model.

const testTour = new Tour({
    name: 'The Forest Hiker',
    rating: 4.7,
    price: 497,
});

// save the document to the database
testTour
    .save()
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.log('Error:', err);
    });

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port:${port}...`);
});
