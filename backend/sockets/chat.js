const Message = require('../models/Message')

const chatHandler = (io) => {
  io.on('connection', (socket) => {
    let { user, friend } = socket.handshake.query

    socket.on('change friend', async (data) => {
      const { newFriend } = data
      friend = newFriend
      messageStream.close()
      messageStream = Message.watch([{
        $match: {
          $or: [
            { sender: user, receiver: newFriend },
            { sender: newFriend, receiver: user }
          ]
        }
      }])
    })

    socket.on('send message', async (data) => {
      const {message, sender, receiver} = data
      const newMessage = new Message({
        message,
        sender,
        receiver,
        timestamp: Date.now()
      })
      await newMessage.save()
    })

    let messageStream = Message.watch([{
      $match: {
        $or: [
          { sender: user, receiver: friend },
          { sender: friend, receiver: user }
        ]
      }
    }])

    messageStream.on('change', (data) => {
      // This doesn't actually do anything.
      // At this point, I discovered that changestreams only work with separately hosted replica sets.
      // I can't afford to host my own replica sets, therefore the experiment with websockets ends here.
      socket.emit('new message', data)
    })
  })
}

module.exports = chatHandler
