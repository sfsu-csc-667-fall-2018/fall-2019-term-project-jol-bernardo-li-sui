const socketIo = require('socket.io')
const {
    USER_JOINED,
    MESSAGE_SEND
} = require('../src/events')
const db = require('../db')


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
            db.task(task => {
                return task.one('select * from users where username = ${username}', data)
                    .then(user => {
                        return task.any('INSERT INTO messages ( ${body:name}, ${id:name} ) VALUES ( ${messageBody}, ${user} )', {
                            messageBody: data.messageBody,
                            user: user.id,
                            body: "messageBody",
                            id: "userId"

                        })
                    })
            })
            .then(() => {
                io.emit(MESSAGE_SEND, data)
            })
            .catch(e => {
                console.log(e)
            })
        })
    })
}

module.exports = {
    init
}