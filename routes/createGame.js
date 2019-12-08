const express = require('express');
const router = express.Router();
const models = require('../models')

/* game session page. */
router.post('/create', function(req, res, next) {
    models.Game.create({gameName: req.body.name}).then( (game) => {
        res.redirect(`/session/${game.dataValues.id}`)
    })
});

router.get('/session/:id', (req, res, next) => {

    models.Game.findOne({where: {gameName: req.params.id}}).then (game => {
        console.log(game)
        res.render('gamesession', {gameName: game.dataValues.id})
    })
})

module.exports = router;