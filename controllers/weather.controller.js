const weatherService = require('../services/aemet.service')

module.exports.get = (req,res,next) => {
  weatherService.getWeather()
    .then(data => res.json(data))
    .catch(next)
}