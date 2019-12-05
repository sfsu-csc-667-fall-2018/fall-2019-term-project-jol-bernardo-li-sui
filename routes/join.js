const express = require('express');
const router = express.Router();

/* join page. */

router.get('/join', function(req, res, next) {
  res.render('joinsession', {title: 'Express'});
}


module.exports = router;