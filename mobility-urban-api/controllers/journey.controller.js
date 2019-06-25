const Journey = require('../models/journey.model')

module.exports.create = (req,res,next) => {
req.body.userID = req.user.id
const journey = new Journey (req.body)

//no deberiamos comprabar si existe el user no?

journey.save()
  .then(journey => {
    res.status(201).json(journey)
  })
  .catch(next)
}