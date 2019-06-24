const express = require('express')
const router = express.Router()

const secure = require('../middleware/secure.mid')
const authController = require('../controllers/auth.controller')

router.post('/register',authController.register)
router.post('/authenticate',authController.authenticate)
router.post('/logout',secure.isAuthenticated,authController.logout)

// only for testing purposes
router.get('/getUsers',secure.isAuthenticated,authController.getUsers)



module.exports = router