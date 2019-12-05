const express = require('express');
const router = express.Router();
let user = require('../auth/controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/index', function(req, res, next) {
    res.render('index', {});
  });

module.exports = router;
