const mongoose = require('mongoose');
const CodeBlock = require('./models/CodeBlock');

async function getCodeBlocks() {
    return await CodeBlock.find();
}

async function getCodeBlockById(id) {
    return await CodeBlock.findById(id);
}

module.exports = { getCodeBlocks, getCodeBlockById };
