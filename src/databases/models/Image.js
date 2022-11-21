module.exports = (sequelize, dataTypes) => {
  let alias = 'Image';

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    path: {
      type: dataTypes.STRING(250),
      allowNull: false,
      defaultValue: 'product_default.jpg',
    },
  };

  let config = {
    tableName: 'images',
    timestamps: false,
  };

  const Image = sequelize.define(alias, cols, config);

  // Associations
  Image.associate = function (models) {
    Image.hasOne(models.Product, {
      // as: 'product_image',
      foreignKey: 'image_id',
    });
  };

  return Image;
};
