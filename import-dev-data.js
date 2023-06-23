const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// eslint-disable-next-line import/no-dynamic-require
const Tour = require(`${__dirname}/models/tourModel`);

dotenv.config({ path: './config.env' });

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

// READ JSON FILE
const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/starter/dev-data/data/tours-simple.json`,
        'utf-8'
    )
);

// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);
