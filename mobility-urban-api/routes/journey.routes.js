const express = require('express')
const router = express.Router()

const secure = require('../middleware/secure.mid')
const journeyController = require('../controllers/journey.controller')

router.post('/',secure.isAuthenticated,journeyController.create)



module.exports = router