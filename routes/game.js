const {
    DRAW_EVENT,
    CARD_PLAYED,
    NEXT_TURN
} = require('../src/events')
const db = require('../db');
const express = require('express');
const router = express.Router();
const models = require("../models")
const validate = require("../backendJS/checkValidCard")

router.get('/game/:id', (req, res, next) => {
    models.Game.findOne({where: {id: req.params.id}}).then( game => {
        models.Player.findOne({where: {gameId: game.dataValues.id, userId: req.user.id}}).then( player => {
            res.render('gamesession', {gameName: game.dataValues.gameName, playerId: player.dataValues.id})
        })
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
        models.Player.findOne({where: {gameId: req.params.gameId, userId: req.user.id}}).then(player => {
            models.Deck.findOne({where: {id: game.dataValues.deckId}}).then (deck => {
                models.Card.findOne({where: {id: deck.dataValues.currentCard}}).then( graveYardCard => {
                    models.Card.findOne({where: {id: req.params.cardId}}).then( card => {
    
                        let valid = false
                        let validType = false

                        if(player.dataValues.turn === true) {
    
                            switch(card.dataValues.type) {
                                case 'Reverse':
                                    valid = validate.checkColor(card, graveYardCard)
                                    validType = validate.checkType(card,graveYardCard)
                                    if(valid || validType){
                                        game.update({reverse: !game.dataValues.reverse}, {where: {id: req.params.gameId}})
                                    }
                                    break
                                case 'Skip':
                                    // valid = validate.skip(card, graveYardCard)
                                    break
                                case 'Draw Two':
                                    valid = validate.checkColor(card, graveYardCard)
                                    validType = validate.checkType(card,graveYardCard)
                                    if(valid || validType){
                                        models.Card.findAll({ where:{played: false, playerId: null, deckId: game.dataValues.deckId}, limit: 2 }).then(cards => {

                                            let nextPlayer = validate.getNextPlayer(game.dataValues.reverse, player.dataValues.position, game.dataValues.playerCount)
    
                                            models.Player.findOne({ where: {gameId: req.params.gameId, position: nextPlayer}}).then( player => {
                                                cards.map(card => {
                                                    card.update({playerId: player.dataValues.id})
                                                })
                                                req.app.io.emit(`DRAW_EVENT/${player.dataValues.id}`, cards)  
                                            })
                                        })
                                    }
                                    break
                                case 'wild':
                                    valid = true
                                    break
                                case 'draw4':
                                    models.Card.findAll({ where:{played: false, playerId: null, deckId: game.dataValues.deckId}, limit: 4 }).then(cards => {

                                        let nextPlayer = validate.getNextPlayer(game.dataValues.reverse, player.dataValues.position, game.dataValues.playerCount)

                                        console.log(nextPlayer)

                                        models.Player.findOne({ where: {gameId: req.params.gameId, position: nextPlayer}}).then( newPlayer => {
                                            cards.map(card => {
                                                card.update({playerId: newPlayer.dataValues.id})
                                            })
                                            req.app.io.emit(`DRAW_EVENT/${newPlayer.dataValues.id}`, cards)  
                                        })
                                    })
                                    valid = true
                                    break
                                default:
                                    valid = validate.colorCard(card, graveYardCard)
                                    break
                            }
                        }
            
                        if(valid || validType){
                            card.update({played: true, playerId: null}).then( card => {
                                models.Deck.update({currentCard: req.params.cardId}, {where: {id: game.dataValues.deckId}}).then( deck => {
                                    player.update({turn: false}, {where: {gameId: req.params.gameId, userId: req.user.id}}).then( _ => {

                                        let nextPosition = validate.getNextPlayer(game.dataValues.reverse, player.dataValues.position, game.dataValues.playerCount)

                                        models.Player.update({turn: true}, {where: {gameId: req.params.gameId, position: nextPosition}}).then( _ => {
                                            models.Player.findOne({where: {turn: true, gameId: req.params.gameId}}).then( newPlayer => {
                                                console.log(newPlayer)
                                                req.app.io.emit(`NEXT_TURN/${game.dataValues.id}`, {playerId: newPlayer.dataValues.id})
                                                req.app.io.emit(`CARD_PLAYED/${req.params.gameId}`, {card: card, game: game})
                                                res.send({sent: true})
                                            })
                                        })
                                    })
                                })
                            })
                        } else{
                            res.send({sent: false})
                        }
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
            if(player.dataValues.turn === true){
                models.Card.findOne({where: {played: false, deckId: game.dataValues.deckId, playerId: null}}).then( card => {
                    card.update({playerId: player.dataValues.id}).then( card => {
                        res.send({sent: true, card: card})
                    })
                })
            }else{
                res.send({sent: false})
            }
        })
    })
})

module.exports = router