const express = require('express')
const router = express.Router()

const secure = require('../middleware/secure.mid')
const searchController = require('../controllers/search.controller')

router.post('/',secure.isAuthenticated,searchController.list)





module.exports = router