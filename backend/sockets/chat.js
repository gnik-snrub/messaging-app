const chatHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user has connected')

    socket.on('chat message', async (data) => {
      io.emit('chat message', message)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })
}

module.exports = chatHandler
