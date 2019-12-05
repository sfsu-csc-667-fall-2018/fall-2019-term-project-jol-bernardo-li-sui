const express = require('express');
const router = express.Router();

/* join page. */

router.get('/lobby', function(req, res, next) {
  res.render('lobby', {username : req.user.username});
})


module.exports = router;