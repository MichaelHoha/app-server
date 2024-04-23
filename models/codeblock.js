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

class CodeBlock extends Model {
  async function getCodeBlockById(id) {
    try {
      const codeBlock = await CodeBlock.findOne({
        where: {
          id: id
        }
      });
      return codeBlock;
    } catch (error) {
      console.error('Error fetching code block by ID:', error);
      throw error;
    }
  }
}

CodeBlock.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    participants_count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CodeBlock',
    tableName: 'code_blocks'
  }
);

// the defined model is the class itself
console.log(CodeBlock === sequelize.models.CodeBlock);

module.exports = CodeBlock;