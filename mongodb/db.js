const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongo.once('open', () => console.log('Connected to MongoDB'));

function getTitles(scheme) {
    return new Promise((resolve, reject) => {
        scheme.find(
            { id: _id }
            , { _id: 0, __v: 0 })
            .exec()
            .then((data) => resolve(data))
            .catch((error) => console.log(error))
    });
}

async function getCodeBlocks() {
    return await CodeBlock.find();
}

async function getCodeBlockById(title) {
    return await CodeBlock.findById(title);
}

module.exports = { getTitles, getCodeBlocks, getCodeBlockById };
