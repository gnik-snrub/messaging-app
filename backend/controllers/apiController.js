const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Message = require('../models/Message')
const jwt = require('jsonwebtoken')

exports.findFriends = async (req, res, next) => {
  const user = await User.find({ _id: req.params.id }, 'friends')
  const friends = await User.find({ _id: { $in: user[0].friends } }, 'username favoriteColor')
  res.json(friends)
}

exports.retrieveMessages = async (req, res, next) => {
  const { sender, receiver } = req.body
  const outgoing = await Message.find({ sender: sender, receiver: receiver })
  const incoming = await Message.find({ sender: receiver, receiver: sender })
  res.json({ messages: [...outgoing, ...incoming].sort((a, b) => a.timestamp - b.timestamp).reverse() })
}

exports.sendMessage = async (req, res, next) => {
  const { message, sender, receiver } = req.body
  const newMessage = new Message({
    message,
    sender,
    receiver,
    timestamp: Date.now()
  })
  await newMessage.save()
  res.json({ success: true })
}

exports.searchUsers = async (req, res, next) => {
  const foundUsers = await User.find({ username: { $regex: req.body.request}}, 'username favoriteColor')
  res.json({ users: foundUsers })
}

exports.addFriend = async (req, res, next) => {
  const { newF, curr } = req.body
  const newFriend = await User.findOne({ _id: newF })
  const currentUser = await User.findOne({ _id: curr })
  // Check to see if they are already friends, or if they are trying to add themselves as a friend
  if (currentUser.friends.includes(newFriend._id)
    || newFriend.friends.includes(currentUser._id)
    || newFriend.id === currentUser.id) {
    res.json({ success: false })
  } else {
    currentUser.friends.push(newFriend._id)
    newFriend.friends.push(currentUser._id)
    await currentUser.save()
    await newFriend.save()
    res.json({ success: true })
  }
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


  res.json({ id: user._id, token: token})
}
