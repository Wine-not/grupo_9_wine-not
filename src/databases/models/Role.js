const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'roles',
    timestamps: false
  })

  // Relations
}