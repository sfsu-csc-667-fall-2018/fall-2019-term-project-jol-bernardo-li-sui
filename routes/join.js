const express = require('express');
const router = express.Router();
const models = require("../models")

/* join page. */

router.get('/lobby', function(req, res, next) {
    models.Game.findAll().then( response => {
        res.render('lobby', {games : response });
    })
})

router.get('/join/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then (game => {
        models.Player.findAll({ where: {gameId: game.dataValues.id} }).then ( userIds => {
            userIds.map( player => {
                if(player.dataValues.userId == req.user.id){
                    res.render('gamesession', {gameName: game.dataValues.gameName, gameId: game.dataValues.id})
                    return
                }
                else{
                    models.Player.create({ userId: req.user.id, gameId: req.params.id, chatId: game.dataValues.chatId, turn: false, score: 0}).then( _ => {
                        res.render('gamesession', {gameName: game.dataValues.gameName, gameId: game.dataValues.id})
                        return
                    })
                }
            })
        })
    })
    .catch(e => console.log(e))
})


module.exports = router;