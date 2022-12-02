const db = require('../../databases/models');
const Op = db.Sequelize.Op;

module.exports = {
  list: async (req, res) => {
    let users = await db.User.findAll();
    
    res.status(200).json({
      total: users.length,
      data: users,
      status: 200
    });
  }
}