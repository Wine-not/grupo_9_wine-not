const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING(45)
  },
  password: {
    type: DataTypes.STRING(45)
  },
  first_name: {
    type: DataTypes.STRING(45)
  },
  last_name: {
    type: DataTypes.STRING(45)
  },
  created_at: {
    type: DataTypes.DATE
  },
  updated_at: {
    type: DataTypes.DATE
  },
  user_address: {
    type: DataTypes.STRING(100)
  },
  city: {
    type: DataTypes.STRING(100)
  },
  postal_code: {
    type: DataTypes.INTEGER
  },
  country: {
    type: DataTypes.STRING(45)
  },
  phone: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
})
