module.exports = (sequelize, dataTypes) => {
  let alias = 'Product';

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
      unique: true,
    },
    price: {
      type: dataTypes.FLOAT,
      allowNull: false,
    },
    rating: {
      type: dataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    in_sale: {
      type: dataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
    is_selection: {
      type: dataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
  };

  let config = {
    tableName: 'products',
    timestamps: false,
  };

  const Product = sequelize.define(alias, cols, config);

  // Associations
  Product.associate = (models) => {
    Product.belongsTo(models.Brand, {
      as: 'product_brand',
      foreignKey: 'brand_id',
    });

    Product.belongsTo(models.Grape, {
      as: 'product_grape',
      foreignKey: 'grape_id',
    });

    Product.belongsTo(models.Region, {
      as: 'product_region',
      foreignKey: 'region_id',
    });

    Product.belongsTo(models.Image, {
      // as: 'product_image',
      foreignKey: 'image_id',
    });
  };

  return Product;
};
