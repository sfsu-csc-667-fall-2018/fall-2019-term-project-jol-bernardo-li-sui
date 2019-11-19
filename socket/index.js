const socketIo = require( 'socket.io' )

const init = ( app, server ) => {
  const io = socketIo( server ) //mount socket server to http server

  app.set( 'io', io )

  io.on( 'connection', socket => {
    console.log( 'client connected' )

    socket.on( 'disconnect', data => {
      console.log( 'client disconnected' )
    })

    socket.on( 'user-joined', data => io.emit( 'user-joined', data ))
    socket.on( 'message-send', data => io.emit( 'message-send', data ))
  })
}

module.exports = { init }
