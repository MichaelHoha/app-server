// controllers/codeBlockController.js
const CodeBlock = require('../models/codeBlock');


async function getAllCodeBlocks(req, res) {
  try {
    const codeBlocks = await CodeBlock.findAll();
    res.json(codeBlocks);
  } catch (error) {
    console.error('Error fetching code blocks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllCodeBlocks
};
