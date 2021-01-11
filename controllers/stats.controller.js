const Journeys = require('../models/journey.model')
const User = require('../models/user.model')

module.exports.list = (req,res,next) => {
  User.findById(req.user.id)
    .populate('journeys')
    .then(user =>  res.status(201).json(user.journeys))
  .catch(next)
}

module.exports.listAll = (req,res,next) => {
  Journeys.find()
    .then(journeys =>  res.status(201).json(journeys))
  .catch(next)
}

