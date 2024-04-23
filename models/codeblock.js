'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CodeBlock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CodeBlock.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    participentsCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CodeBlock',
  });
  return CodeBlock;
};