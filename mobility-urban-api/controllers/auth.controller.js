const User = require('../models/user.model')
const createError = require('http-errors')


module.exports.register = (req,res,next) => {
  const { username,email } = req.body

  User.findOne({ $or: [{ username },{ email }]})
    .then(user => {
      if(user) {
        throw createError(409, 'Email or username already registered')
      } else {
        return new User(req.body).save()
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

// only for testing purpose
module.exports.getUsers = (req,res,next) => {
  
  User.find()
    .then(users => res.json(users))
    .catch(next)
}