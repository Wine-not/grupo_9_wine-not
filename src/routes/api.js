const express = require('express');
const router = express.Router();

const controller = require('../api/apiController');

router.get('/users', controller.listUsers);
router.get('/users/:id', controller.detailUser);

router.get('/products', controller.listProducts);
router.get('/products/:id', controller.detailProduct);

module.exports = router;