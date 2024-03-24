const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  favoriteColor: String
})

module.exports = mongoose.model('User', userSchema)
