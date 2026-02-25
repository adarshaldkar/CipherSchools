const express = require('express');
const router = express.Router();
const queryValidator = require('../middleware/queryValidator');
const { executeQuery } = require('../controllers/queryController');

router.post('/execute', queryValidator, executeQuery);

module.exports = router;
