module.exports = (sequelize, dataTypes) => {
  let alias = 'Grape';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    grape_name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
  };
  
  let config = {
    tableName: 'grapes',
    timestamps: false
  };
    
        
  const Grape = sequelize.define(alias, cols, config);

  Grape.associate = models => {
    Grape.hasMany(models.Product, {
      as: "product_grape",
      foreignKey: "grape_id",
    });
  };
  
  return Grape;
}