const express = require('express')
const router = express.Router()

const secure = require('../middleware/secure.mid')
const journeyController = require('../controllers/journey.controller')

router.post('/',secure.isAuthenticated,journeyController.create)
router.get('/',secure.isAuthenticated,journeyController.list)



module.exports = router