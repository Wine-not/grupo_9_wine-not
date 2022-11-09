const sequelize = require("sequelize");
const Product = require('../models/Product');

module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        brand_name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        vineyard_name: {
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
    
        
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
          as: "Product",
          foreignKey: "brand_id",
          onDelete: "cascade",
        });
      };


    return Brand;
}