const apiController = require('../controllers/apiController')

const express = require('express')
const router = express.Router()

router.get('/retrieveMessages', apiController.retrieveMessages)
router.post('/send/:messageID', apiController.sendMessage)

router.post('/searchUsers/:searchQuery', apiController.searchUsers)
router.post('/addFriend', apiController.addFriend)

router.post('/signup', apiController.signup)
router.post('/login', apiController.login)

module.exports = router
