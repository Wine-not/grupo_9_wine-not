const { validationResult } = require('express-validator');
const db = require('../databases/models');
const { Op } = require('sequelize');
const sequelize = db.sequelize;

module.exports = {
  // Show product cart
  cart: (req, res) => {
    res.render('./products/productCart');
  },

  // Show one product
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
  },

  // Show product create form
  create: async (req, res) => {
    let brands = await db.Brand.findAll();
    let grapes = await db.Grape.findAll();
    let regions = await db.Region.findAll();

    res.render('./products/productCreate', { brands: brands, grapes: grapes, regions: regions });
  },

  // Process product create form
  createProcess: (req, res, next) => {
    // let errors = validationResult(req);
    //
    // if (!errors.isEmpty()) {
    //   res.render('./products/productCreate', {
    //     errors: errors.mapped(),
    //     old: req.body,
    //   });
    // }
    
    db.Product.create({
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
      stock: req.body.stock,
      in_sale: req.body.inSale,
      is_selection: req.body.isSelection,
      brand_id: req.body.brand,
      grape_id: req.body.grape,
      region_id: req.body.region,
      image_id: 1
      // image_id: req.file.filename
    });
  
    res.redirect('./products/shopAll');
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
