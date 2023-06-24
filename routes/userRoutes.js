const express = require('express');
const userController = require('../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// User purpose routers
router.post('/signup', authController.signup);

// REST format routers are more useful for admin purpose
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
