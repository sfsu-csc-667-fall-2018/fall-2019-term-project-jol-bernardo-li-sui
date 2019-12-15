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
            models.Card.findAll({where: {playerId: player.dataValues.id, deckId: game.dataValues.deckId, played: false}, order: [['updatedAt']]}).then( hand => {
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

                        //check if it's players turn
                        if(player.dataValues.turn === true) {

                            //check if card matches color/type or is wild
                            if(validate.checkValid(card, graveYardCard)){

                                //handle card types
                                switch(card.dataValues.type) {
                                    case 'Reverse':
                                        game.update({reverse: !game.dataValues.reverse}, {where: {id: req.params.gameId}})
                                        break

                                    case 'Skip':
                                        //TODO
                                        break

                                    case 'Draw Two':
                                        models.Card.findAll({ where:{played: false, playerId: null, deckId: game.dataValues.deckId}, limit: 2 }).then(cards => {
    
                                            let nextPostition = validate.getNextPlayer(game.dataValues.reverse, player.dataValues.position, game.dataValues.playerCount)
    
                                            models.Player.findOne({ where: {gameId: req.params.gameId, position: nextPostition}}).then( nextPlayer => {
                                                cards.map(card => {
                                                    card.update({playerId: nextPlayer.dataValues.id})
                                                })
                                                req.app.io.emit(`DRAW_EVENT/${nextPlayer.dataValues.id}`, cards)  
                                            })
                                        })
                                        break

                                    case 'draw4':
                                        models.Card.findAll({ where:{played: false, playerId: null, deckId: game.dataValues.deckId}, limit: 4 }).then(cards => {
    
                                            let nextPosition = validate.getNextPlayer(game.dataValues.reverse, player.dataValues.position, game.dataValues.playerCount)
    
                                            models.Player.findOne({ where: {gameId: req.params.gameId, position: nextPosition}}).then( nextPlayer => {
                                                cards.map(card => {
                                                    card.update({playerId: nextPlayer.dataValues.id})
                                                })
                                                req.app.io.emit(`DRAW_EVENT/${nextPlayer.dataValues.id}`, cards)  
                                            })
                                        })
                                        break

                                    default:
                                        break
                                }

                                card.update({played: true, playerId: null}).then( card => {
                                    models.Deck.update({currentCard: req.params.cardId}, {where: {id: game.dataValues.deckId}}).then( deck => {
                                        player.update({turn: false}, {where: {gameId: req.params.gameId, userId: req.user.id}}).then( _ => {
    
                                            let nextPosition = validate.getNextPlayer(game.dataValues.reverse, player.dataValues.position, game.dataValues.playerCount)
    
                                            models.Player.update({turn: true}, {where: {gameId: req.params.gameId, position: nextPosition}}).then( _ => {
                                                models.Player.findOne({where: {turn: true, gameId: req.params.gameId}}).then( nextPlayer => {
                                                    
                                                    console.log("------------------------------------------------------------------------------")
                                                    console.log(nextPlayer.dataValues.id)
                                                    console.log("------------------------------------------------------------------------------")

                                                    req.app.io.emit(`NEXT_TURN/${game.dataValues.id}`, {playerId: nextPlayer.dataValues.id})
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