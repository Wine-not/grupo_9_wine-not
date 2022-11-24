module.exports = (sequelize, dataTypes) => {
<<<<<<< HEAD
    let alias = 'Grape';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
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
    };
    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
    };
    
        
    const Grape = sequelize.define(alias, cols, config);
=======
  let alias = 'Grape';
>>>>>>> 7d971471084032a5b3c82b3942e082271df9fb74

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
  };

  let config = {
    tableName: 'grapes',
    timestamps: false,
  };

  const Grape = sequelize.define(alias, cols, config);

  Grape.associate = (models) => {
    Grape.hasMany(models.Product, {
      foreignKey: 'grape_id',
    });
  };

  return Grape;
};
