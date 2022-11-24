const sequelize = require("sequelize");
const Grape = require('../models/Product');

module.exports = (sequelize, dataTypes) => {
    let alias = 'Grape';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        grape_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        grape_type: {
            type: dataTypes.STRING(100),
            allowNull: false, 
        },
        created_at: {
            type: dataTypes.DATE
         },
        updated_at: {
            type: dataTypes.DATE
        },
    };
    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
    };
    
        
    const Grape = sequelize.define(alias, cols, config);

    Grape.associate = function (models) {
        Grape.hasMany(models.Product, {
          as: "Product",
          foreignKey: "grape_id",
          onDelete: "cascade",
        });
      };


    return Grape;
}