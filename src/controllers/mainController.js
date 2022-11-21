const db = require('../databases/models');
const { Op } = require('sequelize');
const sequelize = db.sequelize;

const controller = {
  index: async (req, res) => {
    let selectedProducts = await db.Product.findAll({
      where: {
        is_selection: {
          [Op.eq]: true,
        },
      },
      limit: 4,
    });

    let saleProducts = await db.Product.findAll({
      where: {
        in_sale: {
          [Op.eq]: true,
        },
      },
      limit: 4,
    });

    res.render('index', { selectedProducts, saleProducts });
  },
};

module.exports = controller;
