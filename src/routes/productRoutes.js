const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productController = require('../controllers/productController');
const { check } = require('express-validator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/products');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
  },
});

const uploadImage = multer(storage);

let validation = [
  check('name')
    .notEmpty()
    .withMessage('Enter the product name')
    .bail()
    .isLength({ min: 5, max: 35 })
    .withMessage('Name must be between 5 and 35 characters'),
  check('price')
    .notEmpty()
    .withMessage('Enter a price for the product')
    .bail()
    .isNumeric()
    .withMessage('Price must be a number'),
  check('brand')
    .notEmpty()
    .withMessage('Enter a brand name')
    .bail()
    .isLength({ min: 5, max: 35 })
    .withMessage('Brand must be between 5 and 35 characters'),
  check('grape')
    .notEmpty()
    .withMessage("Enter product's grape")
    .bail()
    .isLength({ min: 5, max: 35 })
    .withMessage('Grape must be between 5 and 35 characters'),
  check('rating')
    .notEmpty()
    .withMessage('Enter product rating')
    .bail()
    .isNumeric()
    .withMessage('Product rating must be a number'),
  check('region')
    .notEmpty()
    .withMessage("Enter product's region")
    .bail()
    .isLength({ min: 5, max: 35 })
    .withMessage('Region must be between 5 and 35 characters'),
];

// Product cart
router.get('/productCart', productController.productCart);

// Show products
router.get('/productDetail', productController.productDetail);

// Create products
router.get('/productCreate', productController.productCreate);
router.post(
  '/',
  uploadImage.single('image'),
  productController.productCreateProcess
);

module.exports = router;
