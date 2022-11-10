const { INTEGER, STRING, TINYINT } = require("sequelize");
const sequelize = require("sequelize");
const Brand = require('../models/Brand');

module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        region: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        in_sale: {
            type: dataTypes.BOOLEAN()
        },
        brand_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        grape_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        }, 
        image_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: dataTypes.DATE
         },
        updated_at: {
            type: dataTypes.DATE
        },
        selection: {
            type: dataTypes.STRING(500),
            allowNull: false,
        },        
    };

    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
    };


    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function (models) {
        Product.belongsTo(models.Brand, {
          as: "Brand",
          foreignKey: "brand_id",
          onDelete: "cascade",
        });
    };
    Product.associate = function (models) {
        Product.belongsTo(models.Grape, {
          as: "Grape",
          foreignKey: "grapes_id",
          onDelete: "cascade",
        });
    };
    Product.associate = function (models) {
        Product.belongsTo(models.Image, {
          as: "Image",
          foreignKey: "images_id",
          onDelete: "cascade",
        });
    };
    
return Product;
}
