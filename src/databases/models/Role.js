module.exports = (sequelize, dataTypes) => {
  let alias = 'Role';

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: dataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  };

  let config = {
    tableName: 'roles',
    timestamps: false
  };

  const Role = sequelize.define(alias, cols, config);

  // Relations
  Role.associate = models => {
    Role.hasMany(models.User, {
      as: "user_roles",
      foreignKey: "role_id"
    });
  };

  return Role;
}