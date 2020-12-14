const User = require('../models/user.model')

const mobilityService = require('../services/mobility.service')
// lo importo porque me gustaria traerme del modelo los consumos de los coches del usuario


module.exports.list = (req,res,next) => {
  const {origin,destination} = req.body

  mobilityService.totalRequest(origin,destination)
    .then(data => res.status(200).json(data))
    .catch(next)
}



// const googleDistanceService = require('../services/GoogleDistance.service')
// const biciMadService = require('../services/BiciMad.service')
// biciMadService.getOriginDestDecks(origin,destination)
// .then(decks => {
//   return googleDistanceService.getDirections(origin,destination,decks)
// })
