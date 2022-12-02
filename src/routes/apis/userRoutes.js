const express = require('express');
const router = express.Router();

const controller = require('../../controllers/apis/productController');

router.get('/', controller.list);

module.exports = router;