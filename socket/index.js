const socketIo = require('socket.io')
const {
    USER_JOINED,
    MESSAGE_SEND
} = require('../src/events')
const db = require('../db')
const models  = require('../models');


const init = (app, server) => {
    const io = socketIo(server) //mount socket server to http server

    app.set('io', io)

    io.on('connection', socket => {
        console.log('client connected')

        socket.on('disconnect', data => {
            console.log('client disconnected')
        })

        socket.on(USER_JOINED, data => io.emit(USER_JOINED, data))

        socket.on(MESSAGE_SEND, data => {
            models.User.findOne({ where: {username: data.username} }).then( user => {
                models.Message.create({messageBody: data.messageBody, userId: user.dataValues.id}).then( response => {
                    io.emit(MESSAGE_SEND, {messageBody: data.messageBody, userId: user.dataValues.id})
                })
            })
        })
    })
}

module.exports = {
    init
}