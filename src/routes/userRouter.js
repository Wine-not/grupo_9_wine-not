// const logDBMiddleware = require('../middleware/logDBMiddleware');
// const path = require('path');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

let validationsLogin = [
  check('email')
    .notEmpty()
    .withMessage('Enter your email please')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address'),
  check('password')
    .notEmpty()
    .withMessage('Please enter your password')
    .isLength({ min: 10 })
    .withMessage('The password must be at least 10 characters long'),
];

let validationsRegister = [
  check('nickname').notEmpty().withMessage('Enter your nickname please').bail(),
  check('firstName').notEmpty().withMessage('Enter your name please').bail(),
  check('lastName').notEmpty().bail(),
  check('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .bail()
    .isEmail()
    .withMessage('Please enter a correct email address'),
  check('password')
    .notEmpty()
    .withMessage('Please enter a secure password')
    .bail()
    .isStrongPassword()
    .withMessage(
      'Make sure your password is at least 8 characters long and has 1 lowercase, 1 uppercase and 1 number.'
    ),
  check('passwordRepeat')
    .notEmpty()
    .withMessage('Please repeat your password')
    .bail()
    .equals('password')
    .withMessage('Passwords do not match'),
  check('birthdate').notEmpty().withMessage('Please enter your birth date'),
  check('terms')
    .notEmpty()
    .withMessage('You must agree with terms and conditions')
    .bail(),
];

// Log in a user
router.get('/login', userController.login);
router.post('/login', userController.loginProcess);

// Register new user
router.get('/register', userController.register);
router.post('/register', validationsRegister, userController.create);

// Edit a user
router.get('/edit/:idUser', userController.edit);
router.put('/edit/:idUser', userController.update);

// Delete a user
router.delete('/delete/:idUser', userController.delete);

// Show user profile
router.get('/profile', userController.profile);

module.exports = router;
