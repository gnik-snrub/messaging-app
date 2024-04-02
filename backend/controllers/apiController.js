const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.retrieveMessages = (req, res, next) => {
  res.next()
}

exports.sendMessage = (req, res, next) => {
  res.next()
}

exports.searchUsers = async (req, res, next) => {
  const foundUsers = await User.find({ username: { $regex: req.body.request}}, 'username favoriteColor')
  res.json({ users: foundUsers })
}

exports.addFriend = async (req, res, next) => {
  const { newFriend } = req.body
  const currentUser = await User.find({ user: req.params.friendID })
  currentUser[0].friends.push(newFriend)
  await currentUser[0].save()
  res.json({ success: true })
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

exports.login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    res.status(403).json({ errors: ['User does not exist'] })
  }

  const match = bcrypt.compare(req.body.password, user.password)
  if (!match) {
    res.status(403).json({ errors: ['Incorrect password'] })
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id
  }, process.env.JWT_SECRET)


  res.json(token)
}
