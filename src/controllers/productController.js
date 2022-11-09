const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../databases/models');
// const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

 const selectedProducts = db.Product.filter((product) => {
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
     let product = db.Product.findOne((oneProduct) => oneProduct.id == id);
    
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
    
     db.Product.create({
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand,
      stock: req.body.stock,
      inSale: req.body.inSale,
      isSelection: req.body.isSelection,
      grape: req.body.grape,
      rating: req.body.rating,
      description: req.body.description,
      image: req.file.filename,
     })

     
     res.redirect('/products');
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
    // res.render('./products/shopAll', { products });
  },

  delete: (req, res) => {
  //   let id = req.params.id;
  //   let finalProducts = products.filter((product) => product.id != id);
  //
  //   fs.writeFileSync(
  //     productsFilePath,
  //     JSON.stringify(finalProducts, null, ' ')
  //   );
  //
  //   fs.readFile(productsFilePath, (err, productData) => {
  //     if (err) throw err;
  //
  //     products = JSON.parse(productData);
  //   });
  //
  //   res.redirect('/products/shopAll');
  },
};
