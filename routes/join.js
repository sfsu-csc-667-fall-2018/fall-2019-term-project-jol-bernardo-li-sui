const express = require('express');
const Pool = require('pg').Pool
const router = express.Router();

/* join page. */
router.get('/join', function(req, res, next) {
  res.render('lobby', { title: 'Express' });
});

module.exports = router;