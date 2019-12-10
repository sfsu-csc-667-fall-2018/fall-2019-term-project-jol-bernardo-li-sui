const {
    USER_JOINED,
    MESSAGE_SEND
} = require('../src/events')
const express = require('express');
const router = express.Router();
const db = require('../db/index')
const models  = require('../models');


router.post('/sendMessage', (req, res, next) => {
    models.User.findOne({ where: {username: req.user.username} }).then( user => {
        models.Message.create({messageBody: req.body.messageBody, userId: user.dataValues.id}).then( response => {
            req.app.io.emit(MESSAGE_SEND, {messageBody: req.body.messageBody, userId: user.dataValues.id})
            res.send({Message: "Message Sent :)"})
        })
    })
})

router.get('/globalMessages', function(req, res, next) {
    models.Message.findAll({ attributes: ['messageBody', 'userId'] })
        .then(response => {
            res.send(response)
        })
        .catch( e => console.log(e))
});

module.exports = router;