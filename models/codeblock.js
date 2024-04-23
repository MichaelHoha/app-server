const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class CodeBlock extends Model {}

CodeBlock.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    participentsCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CodeBlock',
    tableName: 'code_blocks'
  }
);

// the defined model is the class itself
console.log(CodeBlock === sequelize.models.CodeBlock);