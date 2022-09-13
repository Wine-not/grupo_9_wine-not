const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(
//   fs.readFile(productsFilePath, (err) => {
//     if (err) throw err;
//   })
// );

module.exports = {
  // Show product cart
  productCart: (req, res) => {
    res.render('./products/productCart');
  },

  // Show one product
  productDetail: (req, res) => {
    res.render('./products/productDetail');
  },

  // Show product create form
  productCreate: (req, res) => {
    res.render('./products/productCreate');
  },

  // Process product create form
  productCreateProcess: (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error('Please select an image file');
      error.httpStatusCode = 400;
      return next(error);
    }

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('./products/productCreate', {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
};
