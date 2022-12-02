const db = require('../databases/models');
const Op = db.Sequelize.Op;

module.exports = {
  listUsers: async (req, res) => {
    let users = await db.User.findAll({
      attributes: ['id', 'name', 'email']
    });
  
    // TODO detail endpoint
    res.status(200).json({
      count: users.length,
      data: users,
      status: 200
    });
  },
  
  detailUser: async (req, res) => {
    let user = await db.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'name', 'surname', 'email', 'birthdate']
    });
    
    res.status(200).json({
      data: user,
      status: 200,
      detail: `http://localhost:3000/api/users/${user.id}`
    });
  },
  
  listProducts: async (req, res) => {
    let products = await db.Product.findAll({
      include: [
        {
          model: db.Grape
        }
      ]
    })
    
    // TODO object con una propiedad por categoria
    // TODO detail endpoint
    res.status(200).json({
      count: products.length,
      data: products,
    })
  },
  
  detailProduct: async (req, res) => {
  
  }
}
