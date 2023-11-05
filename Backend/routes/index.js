var express = require('express');
//const { stocks } = require('../api/stocksController');
const { newYear } = require('../api/newYearController');
const { eventFinish } = require('../api/eventFinishController');
const { retirement } = require('../api/retireController');
var router = express.Router();

// Main routing page, all routing should be done here
//router.post('/stocks', stocks)

router.post('/newYear', newYear)

router.post('/finishEvent', eventFinish)

router.post('/retire', retirement)

module.exports = router;
