const User = require('../models/user.model')
const googleService = require('../services/Google.service')
// lo importo porque me gustaria traerme del modelo los consumos de los coches del usuario

const origin = {
  lat:'40.382444',
  lng: '-3.703449'
}
const destination = {
  lat:'40.413866',
  lng: '-3.701186'
}


module.exports.list = (req,res,next) => {
  const {origin,destination} = req.body
  console.log(origin)
  googleService.getDirections(origin,destination)
    .then(data => res.status(200).json(data))
    .catch(next)
}

