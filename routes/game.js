const {
    USER_JOINED
} = require('../src/events')
const express = require('express');
const router = express.Router();
const models = require("../models")

router.get('/game/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {userId: req.user.id, gameId: req.params.id}}).then( player => {
            res.render('gamesession', {gameName: game.dataValues.gameName})
        })
    })
})

router.get('/drawHand/:id', (req, res, next) => {

})

module.exports = router