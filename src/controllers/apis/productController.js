const db = require('../../databases/models');
const Op = db.Sequelize.Op;

module.exports = {
  list: async (req, res) => {
    let products = await db.Product.findAll();
    
    res.status(200).json({
      total: products.length,
      data: products,
      status: 200
    })
  }
}