var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { // route to index home page
  res.render('index');
});

module.exports = router;
