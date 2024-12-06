module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      average_rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    });
  
    Item.associate = (models) => {
      Item.hasMany(models.Review, { foreignKey: 'itemId', as: 'reviews' });
    };
  
    return Item;
  };
  