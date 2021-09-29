'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ressource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Ressource.belongsTo(models.User, {
        foreignKey:{
          allowNull: false
        }
      })
    }
    
  };
  Ressource.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    movie: DataTypes.STRING,
    project: DataTypes.STRING,
    parcours: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ressource',
  });
  return Ressource;
};