var express = require('express');
const {example} = require('../api/exampleController');
var router = express.Router();

// Main routing page, all routing should be done here

// Post addition example routing
router.post('/example', function(req, res, next) {
  example(req, res);
});

module.exports = router;
