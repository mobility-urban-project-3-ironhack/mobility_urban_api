const express = require('express')
const router = express.Router()

const secure = require('../middleware/secure.mid')
const weatherController = require('../controllers/weather.controller')

router.get('/',secure.isAuthenticated,weatherController.get)


module.exports = router