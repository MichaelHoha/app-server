
const express = require('express');
const router = express.Router();
const codeBlockController = require('../controllers/codeBlockController');

// call for all the code blocks from the database
router.get('/codeBlocks', codeBlockController.getAllCodeBlocks);


module.exports = router;
