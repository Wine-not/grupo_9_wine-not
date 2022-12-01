module.exports = (sequelize, dataTypes) => {
  let alias = 'User';

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
    surname: {
      type: dataTypes.STRING(450),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(60),
      allowNull: false
    },
    birthdate: {
      type: dataTypes.DATE,
      allowNull: false
    }
  }

  let config = {
    tableName: 'users',
    timestamps: false,
    createdAt: 'created_at'
  }

  const User = sequelize.define(alias, cols, config);

  // Associations here
  User.associate = models => {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id'
    });

    User.belongsTo((models.Address), {
      foreignKey: 'address_id'
    });
  };

  return User;
}
