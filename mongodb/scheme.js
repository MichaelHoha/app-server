const mongo = require('./db');

const codeBlockSchema = new mongo.mongoose.model('CodeBlock', {
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
