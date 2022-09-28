const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const selectedProducts = products.filter((product) => {
  return product.isSelection == true;
});

module.exports = {
  // Show product cart
  cart: (req, res) => {
    res.render('./products/productCart');
  },

  // Show one product
  detail: (req, res) => {
    let id = req.params.id;
    let product = products.find((oneProduct) => oneProduct.id == id);

    res.render('./products/productDetail', {
      product,
      selectedProducts,
    });
  },

  // Show product create form
  create: (req, res) => {
    res.render('./products/productCreate');
  },

  // Process product create form
  createProcess: (req, res, next) => {
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

    let productAdded = JSON.stringify(products, null, ' ');

    fs.writeFile(productsFilePath, productAdded, (err) => {
      if (err) throw err;
    });
    return;
    // res.redirect('/');
  },

  edit: (req, res) => {
    let id = req.params.id;
    let product = products.find((oneProduct) => oneProduct.id == id);
    res.render('./products/productEdit.ejs', { product: product });
  },

  update: (req, res) => {
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
    res.render('./products/shopAll', { products });
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
