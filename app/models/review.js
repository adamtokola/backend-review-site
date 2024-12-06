module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Review.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
      Review.hasMany(models.Comment, { foreignKey: 'reviewId', as: 'comments' });
    };
  
    return Review;
  };
  