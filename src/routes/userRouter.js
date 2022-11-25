// const path = require('path');
// const multer = require('multer');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');


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
  // check('nickname').notEmpty().withMessage('Enter your nickname please').bail(),
  check('name').notEmpty().withMessage('Enter your name please').bail(),
  check('lastName').notEmpty().withMessage('Enter your surname please').bail(),
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
    //  .isStrongPassword()
     .withMessage(
       'Make sure your password is at least 8 characters long and has 1 lowercase, 1 uppercase and 1 number.'
     ),
   check('passwordRepeat')
     .notEmpty()
     .withMessage('Please repeat your password')
     .bail()
     .custom((value, { req, loc, path }) => {
       if (value !== req.body.password) {
         throw new Error('Passwords do not match');
       } else {
         return value;
       }
     }),
  check('birthdate').notEmpty().withMessage('Please enter your birth date'),
  check('terms')
    .notEmpty()
    .withMessage('You must agree with terms and conditions')
    .bail(),
];

// Log in a user
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validationsLogin , userController.loginProcess);

// Register new user
router.get('/register', guestMiddleware, userController.register);
router.post('/register', validationsRegister, userController.create);

// Edit a user
router.get('/edit/:idUser', userController.edit);
router.put('/edit/:idUser', userController.update);

// Delete a user
router.delete('/delete/:idUser', userController.delete);

// Show user profile
router.get('/profile', authMiddleware, userController.profile);

module.exports = router;
