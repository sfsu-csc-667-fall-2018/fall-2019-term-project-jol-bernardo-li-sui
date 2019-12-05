const express = require('express');
const router = express.Router();

/* join page. */

router.get('/join', function(req, res, next) {
  res.render('error', {title: 'Express'});
})


module.exports = router;