module.exports = (sequelize, dataTypes) => {
  let alias = 'Brand';

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
  };

  let config = {
    tableName: 'brands',
    timestamps: false,
  };

  const Brand = sequelize.define(alias, cols, config);

  // Associations
  Brand.associate = (models) => {
    Brand.hasMany(models.Product, {
      foreignKey: 'brand_id',
    });
  };

  return Brand;
};
