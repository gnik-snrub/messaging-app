const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {console.log('you reached the api!'); res.json({api: true})})

module.exports = router
