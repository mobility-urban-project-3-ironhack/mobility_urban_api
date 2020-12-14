const express = require('express')
const router = express.Router()

const secure = require('../middleware/secure.mid')
const statsController = require('../controllers/stats.controller')

router.get('/',secure.isAuthenticated,statsController.list)
router.get('/all',secure.isAuthenticated,statsController.listAll)





module.exports = router