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

    if (product === null || recommendations === null) {
      res.render('./404');
    } else {
      res.render('./products/productDetail', { product, recommendations });
    }
  },

  // Show product create form
  create: async (req, res) => {
    let brands = await db.Brand.findAll();
    let grapes = await db.Grape.findAll();
    let regions = await db.Region.findAll();

    res.render('./products/productCreate', { brands: brands, grapes: grapes, regions: regions });
  },

  // Process product create form
  createProcess: async (req, res) => {
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      let brands = await db.Brand.findAll();
      let grapes = await db.Grape.findAll();
      let regions = await db.Region.findAll();
      
      res.render('./products/productCreate', {
        errors: errors.mapped(),
        old: req.body,
        brands: brands,
        grapes: grapes,
        regions: regions
      });
    } else {
      if (req.file.filename !== null) {
        let newImage = await db.Image.create({
          path: req.file.filename
        })
  
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
          image_id: newImage.id
        });
      } else {
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
        });
      }
  
      res.redirect('./products/shopAll');
    }
  },

  edit: async (req, res) => {
    let product = await db.Product.findByPk(req.params.id);
    let brands = await db.Brand.findAll();
    let grapes = await db.Grape.findAll();
    let regions = await db.Region.findAll();
    
    res.render('./products/productEdit', { product: product, brands: brands, grapes: grapes, regions: regions })
  },

  update: async (req, res) => {
    db.Product.update({
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
    }, {
      where: {
        id: req.params.id
      }
    });
    
    // TODO validations in update form
    
    res.redirect(`/products/productDetail/${req.params.id}`);
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
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    });
    
    res.redirect('/products/shopAll');
  },
};
