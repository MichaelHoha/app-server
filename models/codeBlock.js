const { Sequelize, DataTypes, Model } = require("sequelize");
const { DATABASE_URL } = process.env;

// create a new Sequelize instance and connect to the, 
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


// define a Sequelize model named CondeBlock that represints the code_blocks tables in the database
class CodeBlock extends Model {}

CodeBlock.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    participants_count: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: false,
    modelName: "CodeBlock", 
    tableName: "code_blocks",
  }
);

// logs whether the CodeBlock_class is the same as the CodeBlock_model
console.log(CodeBlock === sequelize.models.CodeBlock);

module.exports = CodeBlock;

