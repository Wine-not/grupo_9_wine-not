const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


// fs.readFile(productsFilePath, (err, productData) => {
//   if (err) throw err;
//   products = JSON.parse(productData);
// });

const selectedProducts = products.filter((product) => {
  return product.isSelection === true;
});

const saleProducts = products.filter((product) => {
  return product.inSale === true;
});

const controller = {
  index: (req, res) => {
    res.render('index', { selectedProducts, saleProducts });
  },
};

module.exports = controller;
