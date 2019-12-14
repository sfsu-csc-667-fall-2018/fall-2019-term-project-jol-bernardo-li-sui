const {
    USER_JOINED
} = require('../src/events')
const express = require('express');
const router = express.Router();
const models = require("../models")

router.get('/game/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {userId: req.user.id, gameId: req.params.id}}).then( player => {

            models.Card.update(
                {playerId: player.dataValues.id},
                {
                    where: {played: false, playerId: null, deckId: game.dataValues.deckId},
                    limit: 7
                }
            ).then( (effecNumOfRows, effectedRows) => {
                console.log("--------------------------------------------------------")
                console.log(effecNumOfRows)
                effectedRows.map( row => {
                    console.log(row)
                })
                console.log("--------------------------------------------------------")
            })












            res.render('gamesession', {gameName: game.dataValues.gameName})
        })
    })
})

router.get('/drawHand/:id', (req, res, next) => {
    
})

module.exports = router