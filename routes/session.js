const express = require('express');
const router = express.Router();

/* game session page. */
router.get('/gamesession', function(req, res, next) {
  res.render('gamesession', { title: 'Express' });
});

module.exports = router;