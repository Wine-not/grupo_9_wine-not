const express = require('express');
const router = express.Router();
const logDBMiddleware = require('../middleware/logDBMiddleware');
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const path = require('path');
const multer = require('multer');

// users/
router.get('/login', userController.login);
router.post('/login', [
    check('email').isEmail().withMessage('Please enter a valid email address'),
    check('password').isLength({ min: 10 }).withMessage('The password must be at least 10 characters long'),
], userController.loginProcess);
router.get('/register', userController.register);
router.post('/register', logDBMiddleware, userController.create);
router.get('/edit/:idUser', userController.edit);
router.put('/edit/:idUser', userController.update);
router.get('/profile', userController.profile);
router.delete('/delete/:idUser', userController.delete);

module.exports = router;