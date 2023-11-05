var express = require('express');
const {example} = require('../api/exampleController');
const { chatGPTRequest } = require('../api/chatGPTController');
const { stocks } = require('../api/stocksController');
const { newYear } = require('../api/newYearController');
const { eventFinish } = require('../api/eventFinishController');
var router = express.Router();

// Main routing page, all routing should be done here

// Post addition example routing
router.post('/example', example)

router.post('/gptrequest', chatGPTRequest)

router.post('/stocks', stocks)

router.post('/newYear', newYear)

router.post('/finishEvent', eventFinish)

module.exports = router;
