const express = require('express');
const router = express.Router();
const models = require('../models')

/* game session page. */
router.post('/create', function(req, res, next) {
    models.Game.create({gameName: req.body.name}).then( game => {
        models.Chat.create({gameId: game.dataValues.id}).then( chat => {
            models.Game.update({ chatId: chat.dataValues.id }, {where: {id: game.dataValues.id}}).then( _ => {
                // req.app.io.emit("gameCreated") --implement to update lobby on game creation
                res.redirect(`/join/${game.dataValues.id}`)
            })
        })
    })
    .catch(e => console.log(e))
});

module.exports = router;