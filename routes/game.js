const {
    USER_JOINED,
    CARD_PLAYED
} = require('../src/events')
const db = require('../db');
const express = require('express');
const router = express.Router();
const models = require("../models")
const validate = require("../backendJS/checkValidCard")

router.get('/game/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        res.render('gamesession', {gameName: game.dataValues.gameName})
    })
})

router.post('/drawHand/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {userId: req.user.id, gameId: game.dataValues.id}}).then( player => {
            models.Card.findAll({where: {playerId: player.dataValues.id, deckId: game.dataValues.deckId, played: false}}).then( hand => {
                res.send(hand)
            })
        })
    })
    .catch(e => console.log(e))
})

router.get('/playCard/:gameId/:cardId', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.gameId}}).then( game => {
        models.Deck.findOne({where: {id: game.dataValues.deckId}}).then (deck => {
            models.Card.findOne({where: {id: deck.dataValues.currentCard}}).then( graveYardCard => {
                models.Card.findOne({where: {id: req.params.cardId}}).then( card => {

                    let valid = false

                    switch(card.dataValues.type) {
                        case 'Reverse':
                            valid = validate.reverse(card, graveYardCard)
                            break
                        case 'Skip':
                            valid = validate.skip(card, graveYardCard)
                            break
                        case 'Draw Two':
                            valid = validate.drawTwo(card, graveYardCard)
                            break
                        case 'wild':
                            valid = validate.wild(card, graveYardCard)
                            break
                        case 'draw4':
                            valid = validate.drawFour(card, graveYardCard)
                            break
                        default:
                            valid = validate.colorCard(card, graveYardCard)
                            break

                    }
        
        
                    card.update({played: true, playerId: null}).then( card => {
                        models.Deck.update({currentCard: req.params.cardId}, {where: {id: game.dataValues.deckId}}).then( deck => {
                            req.app.io.emit(`CARD_PLAYED/${req.params.gameId}`, card.dataValues)
                        })
                    })
                })  
            })
        })
    })
})

router.get('/graveyard/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Deck.findOne({where: {id: game.dataValues.deckId}}).then(deck => {
            models.Card.findOne({where: {id: deck.currentCard, deckId: deck.dataValues.id}}).then( card => {
                if(card === null){
                    models.Card.findOne({where: {deckId: deck.dataValues.id, played: false, playerId: null}}).then( card => {
                        deck.update({currentCard: card.dataValues.id}).then( deck => {
                            card.update({played: true}).then( card => {
                                res.send({card: card, game: game})
                            })
                        })
                    })
                }else{
                    res.send({card: card, game: game})
                }
            })
        })
    })
})

router.get('/drawCard/:id', (req,res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {gameId: game.dataValues.id, userId: req.user.id}}).then( player => {
            models.Card.findOne({where: {played: false, deckId: game.dataValues.deckId, playerId: null}}).then( card => {
                card.update({playerId: player.dataValues.id}).then( card => {
                    res.send(card)
                })
            })
        })
    })
})

module.exports = router