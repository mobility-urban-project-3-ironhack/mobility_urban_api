const biciMad = require('./biciMad.service')
const googleService = require('./google.service')
const constants = require('../constants/constants')


const bikeRequest = (origin,destination) => 
  biciMad.getOriginDestDecks(origin,destination)
    .then(decks => Promise.all([
        googleService.request(origin,decks.originDeck,'walking'),
        googleService.request(decks.originDeck,decks.destinationDeck,'bicycling'),
        googleService.request(decks.destinationDeck,destination,'walking'),
      ])
    )
    .then(([walkingInit,bicycling,walkingFinal]) => {
      return {
        bicycling: {
          wayPoints:[{
            transitMode: 'walking',
            distance: walkingInit.distance.value,
            time: walkingInit.duration.value,
            wayPoint: {
              lat: walkingInit.end_location.lat,
              lng:  walkingInit.end_location.lng
            }, 
            additionalInfo : {}
          },
          {
            transitMode: 'bicycling',
            distance: bicycling.distance.value,
            time: bicycling.duration.value,
            wayPoint: {
              lat:  bicycling.end_location.lat,
              lng:  bicycling.end_location.lng
            },
            additionalInfo : {}
          },
          {
            transitMode: 'walking',
            distance: walkingFinal.distance.value,
            time: walkingFinal.duration.value,
            wayPoint:{
              lat:  walkingFinal.end_location.lat,
              lng:  walkingFinal.end_location.lng
            },
            additionalInfo : {}
          },
        ],
        totalDistance: walkingInit.distance.value + bicycling.distance.value + walkingFinal.distance.value,
        totalTime: walkingInit.duration.value + bicycling.duration.value + walkingFinal.duration.value,
        totalCalories: (walkingInit.duration.value + walkingFinal.duration.value)*constants.caloriesSecond.walking + bicycling.duration.value*constants.caloriesSecond.bike,
        co2: 0,
        cost: Math.ceil(bicycling.duration.value/3600)*constants.biciMadRate,
      }
    }
  })

module.exports = {
  bikeRequest
}