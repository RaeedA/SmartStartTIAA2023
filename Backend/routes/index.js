var express = require('express');
const {example} = require('../api/exampleController');
const { chatGPTRequest } = require('../api/chatGPTController');
const { stocks } = require('../api/stocksController');
var router = express.Router();

// Main routing page, all routing should be done here

// Post addition example routing
router.post('/example', example)

router.post('/gptrequest', chatGPTRequest)

router.post('/stocks', stocks)

module.exports = router;
