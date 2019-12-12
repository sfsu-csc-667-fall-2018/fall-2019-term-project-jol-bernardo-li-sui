const express = require('express');
const router = express.Router();
const models = require('../models')

/* game session page. */
router.post('/create', function(req, res, next) {

    //create new column in game table with name
    models.Game.create({gameName: req.body.name}).then( game => {

        //create new chat with gameId
        models.Chat.create({gameId: game.dataValues.id}).then( chat => {

            //create player with userId, gameId, and chatId
            models.Player.create({userId: req.user.id, gameId: game.dataValues.id, chatId: chat.dataValues.id, turn: false, score: 0}).then( _ => {

                //update game table with chat id
                models.Game.update({ chatId: chat.dataValues.id }, {where: {id: game.dataValues.id}}).then( _ => {

                    // req.app.io.emit("gameCreated") --implement to update lobby on game creation
                    res.redirect(`/join/${game.dataValues.id}`)
                })  
            })
        })
    })
    .catch(e => console.log(e))
});

module.exports = router;