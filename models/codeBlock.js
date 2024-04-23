const { Sequelize, DataTypes, Model } = require('sequelize');
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  ssl: true, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

class CodeBlock extends Model {}

CodeBlock.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    participants_count: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CodeBlock',
    tableName: 'code_blocks'
  }
);

// the defined model is the class itself
console.log(CodeBlock === sequelize.models.CodeBlock);

module.exports = CodeBlock;