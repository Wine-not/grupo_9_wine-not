const { validationResult } = require('express-validator');
const db = require('../databases/models');
<<<<<<< HEAD
// const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

 const selectedProducts = db.Product.filter((product) => {
   return product.isSelection == true;
 });
=======
const { Op } = require('sequelize');
const sequelize = db.sequelize;
>>>>>>> 7d971471084032a5b3c82b3942e082271df9fb74

module.exports = {
  // Show product cart
  cart: (req, res) => {
    res.render('./products/productCart');
  },

  // Show one product
<<<<<<< HEAD
  detail: (req, res) => {
     let id = req.params.id;
     let product = db.Product.findOne((oneProduct) => oneProduct.id == id);
    
     res.render('./products/productDetail', {
       product,
      selectedProducts,
     });
=======
  detail: async (req, res) => {
    let product = await db.Product.findOne({
      where: {
        id: {
          [Op.eq]: req.params.id,
        },
      },
      include: [
        {
          model: db.Image,
        },
        {
          model: db.Grape,
        },
        {
          model: db.Brand,
        },
      ],
    });

    let recommendations = await db.Product.findAll({
      where: {
        id: {
          [Op.ne]: req.params.id,
        },
      },
      limit: 4,
      include: {
        model: db.Image,
      },
    });

    res.render('./products/productDetail', { product, recommendations });
>>>>>>> 7d971471084032a5b3c82b3942e082271df9fb74
  },

  // Show product create form
  create: async (req, res) => {
    let brands = await db.Brand.findAll();
    let grapes = await db.Grape.findAll();
    let regions = await db.Region.findAll();

    res.render('./products/productCreate', { brands, grapes, regions });
  },

  // Process product create form
  createProcess: (req, res, next) => {
<<<<<<< HEAD
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
=======
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('./products/productCreate', {
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // let newProduct = {
    //   id: products[products.length - 1].id + 1,
    //   name: req.body.name,
    //   price: parseFloat(req.body.price),
    //   brand: req.body.brand,
    //   stock: parseInt(req.body.stock, 10),
    //   inSale: req.body.inSale == undefined ? false : true,
    //   isSelection: req.body.isSelection == undefined ? false : true,
    //   grape: req.body.grape,
    //   rating: parseFloat(req.body.rating),
    //   region: req.body.region,
    //   image: req.file.filename,
    // };
    //
    // products.push(newProduct);
    //
    // let productAdded = JSON.stringify(products, null, ' ');
    //
    // fs.writeFile(productsFilePath, productAdded, (err) => {
    //   if (err) throw err;
    // });
    // return;
    // res.redirect('/');
>>>>>>> 7d971471084032a5b3c82b3942e082271df9fb74
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

  shopAll: async (req, res) => {
    let allProducts = await db.Product.findAll({
      include: {
        model: db.Image,
      },
    });

    res.render('./products/shopAll', { allProducts });
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
