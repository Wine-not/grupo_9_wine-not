module.exports = (sequelize, dataTypes) => {
  let alias = 'Region';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false
    },
    country: {
      type: dataTypes.STRING(50),
      allowNull: false
    }
  };
  
  let config = {
    tableName: 'regions',
    timestamps: false
  };
  
  const Region = sequelize.define(alias, cols, config);
  
  // Associations
  Region.associate = models => {
    Region.hasMany(models.Product, {
      as: 'product_region',
      foreignKey: 'region_id'
    });
  };
  
  return Region;
};