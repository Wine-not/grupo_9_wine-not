const sequelize = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Grape',
    cols = {
        id: {
            type: dataTypes.INT(100),
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
    },        
    config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
        }  
    
        
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