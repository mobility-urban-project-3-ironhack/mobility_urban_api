const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')

router.post('/register',authController.register)

// only for testing purposes
router.get('/getUsers',authController.getUsers)



module.exports = router