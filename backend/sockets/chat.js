const Message = require('../models/Message')

const chatHandler = (io) => {
  io.on('connection', (socket) => {
    socket.on('chat message', async (data) => {
      const {message, sender, receiver} = data
      const newMessage = new Message({
        message,
        sender,
        receiver,
        timestamp: Date.now()
      })
      await newMessage.save()

      io.emit('chat message', data)
    })
  })
}

module.exports = chatHandler
