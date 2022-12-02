const db = require('../databases/models');
const Op = db.Sequelize.Op;

module.exports = {
  listUsers: async (req, res) => {
    let users = await db.User.findAll({
      attributes: ['id', 'name', 'email']
    });
  
    res.status(200).json({
      count: users.length,
      data: users,
      status: 200
    });
  },
  
  detailUser: async (req, res) => {
  
  },
  
  listProducts: async (req, res) => {
  
  },
  
  detailProduct: async (req, res) => {
  
  }
}
