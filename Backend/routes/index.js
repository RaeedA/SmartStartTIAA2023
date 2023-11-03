var express = require('express');
const {example} = require('../api/exampleController');
var router = express.Router();

/* GET example. */
router.post('/example', function(req, res, next) {
  example(req, res);
});

module.exports = router;
