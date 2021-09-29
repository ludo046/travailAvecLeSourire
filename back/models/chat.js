'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Chat.belongsTo(models.User,{
        foreignKey:{
          allowNull: false
        }
      })
    }
  };
  Chat.init({
    UserId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    image: DataTypes.STRING,
    movie: DataTypes.STRING,
    roomId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};