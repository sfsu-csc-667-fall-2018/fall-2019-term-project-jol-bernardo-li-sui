var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// login
router.get('/login',(req, res) => res.render('login'));
// Register
router.get('/signup',(req, res) => res.render('signup'));

module.exports = router;
