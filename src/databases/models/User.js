const { DataTypes } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
  let alias = 'User';

  let cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    address: DataTypes.STRING(100),
    city: DataTypes.STRING(45),
    postal_code: DataTypes.STRING(45),
    country: DataTypes.STRING(45),
    telephone: DataTypes.INTEGER
  }

  let config = {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

  const User = sequelize.define(alias, cols, config); // return sequelize.define(alias, cols, config);

  // Associations here

  return User;
}
