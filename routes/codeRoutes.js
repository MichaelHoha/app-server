const express = require('express');
const router = express.Router();
const { getCodeBlocks, getCodeBlockById } = require('../mongodb/db');

router.get('/', async (req, res) => {
    const codeBlocks = await getCodeBlocks();
    res.json(codeBlocks);
});

router.get('/id', async (req, res) => {
    const codeBlock = await getCodeBlockById(req.params.id);
    res.json(codeBlock);
});

module.exports = router;
