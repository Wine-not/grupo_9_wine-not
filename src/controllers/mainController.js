const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
let products = [];

fs.readFile(productsFilePath, (err, productData) => {
  if (err) throw err;

  products = JSON.parse(productData);
});

const controller = {
  index: (req, res) => {
    res.render('index', { products });
  },
};

module.exports = controller;
