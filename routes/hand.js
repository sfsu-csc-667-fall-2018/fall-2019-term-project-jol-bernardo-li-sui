const express = require('express');
const router = express.Router();
const models = require("../models")

router.get('/hand/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {userId: req.user.id, gameId: req.params.id}}).then( player => {
            models.Card.findAll({
                where:{played: false, playerId: null, deckId: game.dataValues.deckId},
                limit: 7
            }).then(cards => {
                cards.map(card => {
                    card.update({playerId: player.dataValues.id})
                })
                res.redirect(`/game/${req.params.id}`)
            })
        })
    })
})

module.exports = router