const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Image',
    cols = {
        id: {
            type: dataTypes.INT(100),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        image_path: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INT(100),
            allowNull: false, 
        },
        created_at: {
            type: dataTypes.DATE
         },
        updated_at: {
            type: dataTypes.DATE
        },
    },        
    config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
        }  
    
        
    const Image = sequelize.define(alias, cols, config);

    Image.associate = function (models) {
        Image.hasMany(models.Product, {
          as: "Product",
          foreignKey: "image_id",
          onDelete: "cascade",
        });
      };


    return Image;
}