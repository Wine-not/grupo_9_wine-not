module.exports = (sequelize, dataTypes) => {
  let alias = 'Address';

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    address: {
      type: dataTypes.STRING(200),
      allowNull: false
    },
    city: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    postal_code: {
      type: dataTypes.STRING(10),
      allowNull: false
    },
    country: {
      type: dataTypes.STRING(20),
      allowNull: false
    }
  };

  let config = {
    tableName: 'addresses',
    timestamps: false
  };

  const Address = sequelize.define(alias, cols, config);

  // Associations
  Address.associate = models => {
    Address.hasOne(models.User, {
      as: 'user_address',
      foreignKey: 'address_id'
    })
  };

  return Address;
}