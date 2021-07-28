'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ressourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{
        foreignKey:'id'
      })
    }
  };
  Ressourse.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    movie: DataTypes.STRING,
    project: DataTypes.STRING,
    parcour: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ressourse',
  });
  return Ressourse;
};