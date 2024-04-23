// routes/codeBlockRoutes.js
const express = require('express');
const router = express.Router();
const codeBlockController = require('../controllers/codeBlockController');

// Routes
router.get('/codeBlocks', codeBlockController.getAllCodeBlocks);

module.exports = router;
