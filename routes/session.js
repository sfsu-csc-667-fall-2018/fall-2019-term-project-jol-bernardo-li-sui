const express = require('express');
const router = express.Router();

/* game session page. */
router.get('/session', function(req, res, next) {
  res.render('gamesession', { title: 'Express' });
});

module.exports = router;