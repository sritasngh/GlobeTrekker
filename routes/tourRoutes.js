const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// Params middleware: This middleware is only called for the router having that parameter
// router.param('id', tourController.checkID);

router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
