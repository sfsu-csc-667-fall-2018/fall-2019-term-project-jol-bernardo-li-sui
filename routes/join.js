const express = require('express');
const router = express.Router();
const models = require("../models")

/* join page. */

router.get('/lobby', function(req, res, next) {
    models.Game.findAll({attributes: ["gameName"]}).then( response => {
        response.map( game => {
            console.log(game)
        })
        res.render('lobby', {games : response});
    })
})


module.exports = router;