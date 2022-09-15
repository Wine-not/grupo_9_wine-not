const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// fs.readFile(productsFilePath, (err, productData) => {
//   if (err) throw err;

//   products = JSON.parse(productData);
//   console.log(products);
// });

module.exports = {
  // Show product cart
  productCart: (req, res) => {
    res.render('./products/productCart');
  },

  // Show one product
  productDetail: (req, res) => {
    let id = req.params.id;
    let product = products.find((oneProduct) => oneProduct.id == id);
    res.render('./products/productDetail', { product: product });
  },

  // Show product create form
  productCreate: (req, res) => {
    res.render('./products/productCreate');
  },

  // Process product create form
  productCreateProcess: (req, res, next) => {
    // const file = req.file;
    let errors = validationResult(req);

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

  productEdit: (req, res) => {
    let id = req.params.id;
    let product = products.find((oneProduct) => oneProduct.id == id);
    res.render('./products/productEdit.ejs', { product: product });
  },

  productUpdate: (req, res) => {
    let id = req.params.id;
    let producToEdit = products.find((product) => product.id == id);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('./products/productCreate', {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    producToEdit = {
      id: producToEdit.id,
      ...req.body,
      image: producToEdit.image,
    };

    let newProducts = products.map((product) => {
      if (product.id == producToEdit.id) {
        return (product = { ...producToEdit });
      }
      return product;
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
    products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    res.redirect('/products/shopAll');
  },

  shopAll: (req, res) => {
    res.render('./products/shopAll');
  },

  delete: (req, res) => {
    let id = req.params.id;
    let finalProducts = products.filter((product) => product.id != id);
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(finalProducts, null, ' ')
    );
    fs.readFile(productsFilePath, (err, productData) => {
      if (err) throw err;

      products = JSON.parse(productData);
    });
    res.redirect('/products/shopAll');
  },
};
