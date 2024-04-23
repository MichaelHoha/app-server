const { Sequelize, DataTypes, Model } = require('sequelize');
const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  ssl: true, // Enable SSL to connect to Heroku PostgreSQL (required)
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

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

module.exports = CodeBlock;