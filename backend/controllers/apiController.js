const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.retrieveMessages = (req, res, next) => {
  res.next()
}

exports.sendMessage = (req, res, next) => {
  res.next()
}

exports.searchUsers = (req, res, next) => {
  res.next()
}

exports.addFriend = (req, res, next) => {
  res.next()
}

exports.signup = async (req, res, next) => {
  const errors = []

  const { username, password, favoriteColor } = req.body
  const foundUser = await User.findOne({ username: username })

  if (foundUser) {
    errors.push('Username already exists')
  }

  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password) === false) {
    errors.push('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  }

  if (errors.length === 0) {
    const encryptedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({
      username,
      password: encryptedPassword,
      favoriteColor: favoriteColor
    })
    await newUser.save()

    console.log(`User ${username} created!`)
    res.json({ id: newUser._id, errors: errors })
  } else {
    console.log(`Errors: ${errors}`)
    res.json({id: null, errors: errors })
  }
}

exports.login = (req, res, next) => {
  res.next()
}
