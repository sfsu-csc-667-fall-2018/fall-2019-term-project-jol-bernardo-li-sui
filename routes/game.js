const {
    USER_JOINED
} = require('../src/events')
const db = require('../db');
const express = require('express');
const router = express.Router();
const models = require("../models")

router.get('/game/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        res.render('gamesession', {gameName: game.dataValues.gameName})
    })
})

router.get('/drawHand/:id', (req, res, next) => {
    console.log("---------------------------------------DRAWHAND")
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        console.log("---------------------------------------GAME")
        models.Player.findOne({where: {userId: req.user.id, gameId: game.dataValues.id}}).then( player => {
            console.log("---------------------------------------PLAYER")
            models.Card.findAll({where: {playerId: player.dataValues.id, deckId: game.dataValues.deckId}}).then( hand => {
                console.log(`gameId: ${game.dataValues.id}`)
                console.log(`userId: ${req.user.id}`)
                console.log(`playerId: ${player.dataValues.id}`)
                console.log(`deckId: ${game.dataValues.deckId}`)
                console.log(hand)
                res.send(hand)
            })
        })
    })
    .catch(e => console.log(e))
})

module.exports = router