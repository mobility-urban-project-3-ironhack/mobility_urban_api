const User = require('../models/user.model')
const googleDistanceService = require('../services/GoogleDistance.service')
const biciMadService = require('../services/BiciMad.service')
// lo importo porque me gustaria traerme del modelo los consumos de los coches del usuario


module.exports.list = (req,res,next) => {
  const {origin,destination} = req.body

  biciMadService.getOriginDestDecks(origin,destination)
  .then(decks => {
    return googleDistanceService.getDirections(origin,destination,decks)
  })
    .then(data => res.status(200).json(data))
    .catch(next)
}

