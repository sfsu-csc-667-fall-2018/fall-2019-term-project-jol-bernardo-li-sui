const express = require('express');
const router = express.Router();
const models = require("../models")

/* join page. */

router.get('/lobby', function(req, res, next) {
    models.Game.findAll().then( response => {
        res.render('lobby', {games : response});
    })
})

router.get('/join/:id', (req, res, next) => {
    
    models.Player.create({ userId: req.user.id, gameId: req.params.id, turn: false, score: 0 }).then( player => {
        models.Game.findOne({where: {id: req.params.id}}).then (game => {
            res.render('gamesession', {gameName: game.dataValues.gameName})
        })
    })
    .catch(e => console.log(e))
})


module.exports = router;