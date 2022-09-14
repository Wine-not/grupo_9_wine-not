const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = [];

fs.readFile(productsFilePath, (err, productData) => {
  if (err) throw err;

  products = JSON.parse(productData);
});

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
    // const file = req.file;
    let errors = validationResult(req);

    // if (!file) {
    //   const err = new Error('Please upload a product image');
    //   err.httpStatusCode = 400;
    //   return next(err);
    // }

    if (!errors.isEmpty()) {
      res.render('./products/productCreate', {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    let newProduct = {
      id: products[products.length - 1].id + 1,
      name: req.body.name,
      price: parseFloat(req.body.price),
      brand: req.body.brand,
      stock: parseInt(req.body.stock, 10),
      inSale: req.body.inSale == undefined ? false : true,
      isSelection: req.body.isSelection == undefined ? false : true,
      grape: req.body.grape,
      rating: parseFloat(req.body.rating),
      region: req.body.region,
      image: req.file.filename,
    };

    products.push(newProduct);

    let productAdded = JSON.stringify(products);

    fs.writeFile(productsFilePath, productAdded, (err) => {
      if (err) throw err;
    });

    res.redirect('/');
  },
};
