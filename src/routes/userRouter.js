const express = require('express');
const router = express.Router();
const logDBMiddleware = require('../middleware/logDBMiddleware');
const userController = require('../controllers/userController');

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', logDBMiddleware, userController.store);

module.exports = router;