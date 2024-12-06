module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
    };
  
    return User;
  };
  