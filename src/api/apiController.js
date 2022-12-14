const db = require('../databases/models');
const Op = db.Sequelize.Op; 

module.exports = {
  
  listUsers: async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let users = await db.User.findAll({
      attributes: ['id', 'name', 'email']
    });
  
    
    res.status(200).json({
      count: users.length,
      data: users,
      status: 200,
      detail: `/api/users/`
    });
  },
  
  detailUser: async (req, res) => {    
    res.set('Access-Control-Allow-Origin', '*');
    let user = await db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'surname', 'email', 'birthdate']
    });
    
    res.status(200).json({
      data: user,
      status: 200,
      detail: `/api/users/${user.id}`
    });
  },
  
  listProducts: async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let products = await db.Product.findAll({
      include: [
        {
          model: db.Grape
        }
      ]
    })

    let productsByCategory = await db.Grape.findAll({
      attributes: ['name'],
      include: [
        {
          model: db.Product
        }
      ]
    })

    const productsByCategoryArray = productsByCategory.map(category => {
      return {
        name: category.name,
        count: category.Products.length
      }
  })

    res.status(200).json({
      count: products.length,
      data: {
        products,
        productsByCategoryArray
      },
      status: 200,
      detail: `/api/products`
    })
  },
  
  detailProduct: async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let product = await db.Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'price', 'rating', 'description', 'stock', 'in_sale', 'is_selection'],
      include: [
        {
          model: db.Brand
        },
        {
          model: db.Grape
        },
        {
          model: db.Image
        },
        {
          model: db.Region,
          as: 'product_region'
        }
      ]
    })
    
    res.status(200).json({
      data: product,
      status: 200,
      detail: `/api/products/${product.id}`
    });
  
  }
}
