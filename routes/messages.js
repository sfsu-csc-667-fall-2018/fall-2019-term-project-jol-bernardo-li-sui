const express = require('express');
const router = express.Router();
const db = require('../db/index')
const models  = require('../models');

/* game session page. */
router.get('/globalMessages', function(req, res, next) {
    models.Message.findAll({ attributes: ['messageBody', 'userId'] })
        .then(response => {
            res.send(response)
        })
        .catch( e => console.log(e))
});

module.exports = router;