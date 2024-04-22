const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.model('CodeBlock', {
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});


module.exports = { codeBlockSchema };
