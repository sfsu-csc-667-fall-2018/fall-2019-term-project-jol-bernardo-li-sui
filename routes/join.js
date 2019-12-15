const {
    GAME_MESSAGE_SEND,
    USER_JOINED
} = require('../src/events')
const express = require('express');
const router = express.Router();
const models = require("../models")

/* join page. */
router.get('/lobby', function(req, res, next) {
    models.Game.findAll({ 
        attributes: ['id', 'gameName'],
        include: [{ 
            model: models.Player,
            attributes: ["userId"],
            include: [{model: models.User, attributes: ["username"]}]
        }]
    }).then( games => {
        res.render("lobby", {games: games})
    })
    .catch(e => console.log(e))
})

router.get('/join/:id', (req, res, next) => {

    let playerList = 0

    models.Player.findAll({ where: {gameId: req.params.id} }).then( players => {
        playerList = players.length
    })

    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({ where: {gameId: game.dataValues.id, userId: req.user.id} }).then( player => {

            //check if user is already in the game
            if(player !== null){
                res.redirect(`/game/${game.dataValues.id}`)
            }
            //if user is not in game already and game is not full, create new player and add to game
            else if(playerList < 4){
                models.Player.create({ userId: req.user.id, gameId: req.params.id, chatId: game.dataValues.chatId, position: (playerList + 1), turn: false, score: 0}).then( player => {
                    //post to game chat that user has joined
                    models.Message.create({messageBody: `${req.user.username} joined the game`, userId: req.user.id, chatId: game.dataValues.chatId}).then( _ => {
                        req.app.io.emit(`${USER_JOINED}/${req.params.id}`, {messageBody: `${req.user.username} joined the game`, username: req.user.username, score: player.dataValues.score, playerId: player.dataValues.id})
                        res.redirect(`/hand/${game.dataValues.id}`)
                    })
                })
            }
            //if game is full redirect back to lobby
            else{
                res.redirect('/lobby')
            }
        })
    }).then( _ => {})
    .catch(e => console.log(e))
})

router.get("/users/:id", (req, res, next) => {
    models.Player.findAll({
        where: {gameId: req.params.id},
        include: [{
            model: models.User,
            attributes: ["username"]
        }]
    }).then( users => {
        res.send(users)
    })
})


module.exports = router;