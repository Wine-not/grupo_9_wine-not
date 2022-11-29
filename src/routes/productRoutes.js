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

const uploadImage = multer({ storage });

let validations = [
  check('name')
    .notEmpty()
    .withMessage('Enter the product name')
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage('Name must be between 5 and 100 characters'),
  check('price')
    .notEmpty()
    .withMessage('Enter a price for the product')
    .bail()
    .isNumeric()
    .withMessage('Price must be a number'),
  check('brand')
    .exists({ checkFalsy: true })
    .withMessage('Brand field is required'),
  check('grape')
    .exists({ checkFalsy: true })
    .withMessage('Grape field is required'),
  check('rating')
    .notEmpty()
    .withMessage('Enter product rating')
    .bail()
    .isFloat({ min: 1.00, max: 5.00 })
    .withMessage('Product rating must be between 1 and 5'),
  check('region')
    .exists({ checkFalsy: true })
    .withMessage('Region field is required'),
  check('stock')
    .notEmpty()
    .withMessage('Add stock quantity')
    .bail()
    .isInt({ max: 30 })
    .withMessage('Stock must be a number up to 30'),
  check('description')
    .notEmpty()
    .withMessage('Description can not be empty')
    .bail()
    .isLength({ min: 20 })
    .withMessage('Description must have at least 20 characters')
];

// TODO path names
// Product cart
router.get('/productCart', productController.cart);

// Show products
router.get('/productDetail/:id', productController.detail);

// Create products
router.get('/productCreate', productController.create);
router.post('/', uploadImage.single('image'), validations, productController.createProcess);

// Edit products
router.get('/productEdit/:id', productController.edit);
router.put('/productEdit/:id', validations, productController.update);

//Delete product
router.delete('/delete/:id', productController.delete);

//Product List
router.get('/shopAll', productController.shopAll);

module.exports = router;
