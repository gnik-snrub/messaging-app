const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Messages', messageSchema)
