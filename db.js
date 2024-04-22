const mongoose = require('mongoose');
const CodeBlock = require('./models/CodeBlock');

async function getCodeBlocks() {
    return await CodeBlock.find();
}

async function getCodeBlockById(title) {
    return await CodeBlock.findById(title);
}

module.exports = { getCodeBlocks, getCodeBlockById };
