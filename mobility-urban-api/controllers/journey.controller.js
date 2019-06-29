const Journeys = require('../models/journey.model')

module.exports.create = (req,res,next) => {
req.body.userID = req.user.id
const journey = new Journeys (req.body)

//no deberiamos comprabar si existe el user no?

journey.save()
  .then(journey => {
    res.status(201).json(journey)
  })
  .catch(next)
}

module.exports.list = (req,res,next) => {

  Journeys.find({ userID : req.user.id })
    .then(journeys => res.status(200).json(journeys))
    .catch(next)
}