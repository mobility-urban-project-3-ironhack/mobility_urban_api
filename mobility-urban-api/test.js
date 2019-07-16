const googleService = require('./services/googleDistance.service')
const biciMadService = require('./services/biciMad.service')
const motoService = require('./services/moto.service')
const randomLocation = require('random-location')


const origin = {
  "lat":40.382444,
  "lng":-3.703449
}

const destination = {
  "lat":40.413866,
  "lng":-3.701186
}


// biciMadService.getOriginDestDecks(origin,destination)
//   .then(decks => googleService.bikeRequest(origin,destination,decks))
//   .then(res => console.log(JSON.stringify(res)))
//   .catch(error => console.error(error))


// .then(res => console.log(JSON.stringify(res)))
// googleService.bikeRequest(origin,destination,originBikeDeck,destinationBikeDeck)
//   .then(res => console.log(res))
//   .catch(error => console.error(error))

console.log(motoService.randomLocationCoor(origin))