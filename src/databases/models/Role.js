// const { DataTypes } = require('sequelize');
const User = require('../models/User')

module.exports = (sequelize, DataTypes) => {
  let alias = 'Role';

  let cols = {
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
  };

  let config = {
    tableName: 'roles',
    timestamps: false
  };

  const Role = sequelize.define(alias, cols, config);

  // Relations
  Role.hasMany(User, {
    as: 'user',
    foreignKey: 'id'
  });

  return Role
}