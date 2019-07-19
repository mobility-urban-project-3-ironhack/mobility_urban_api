const googleService = require('./google.service')
const constants = require('../constants/constants')

const vtcRequest = (origin,destination) => googleService.request(origin,destination,'driving')
  .then(drivingJourney => {
    return {
      vtc:[
        {
          cabify: {
            wayPoints:[],
            totalDistance: drivingJourney.distance.value,
            totalTime: drivingJourney.duration.value + constants.waitingTime.cabify,
            totalCalories: 0,
            co2: (drivingJourney.distance.value/1000)*constants.co2Consumption.cabify,
            cost: constants.cabifyRate.fix + (drivingJourney.distance.value/1000)*(Math.floor(Math.random() * (constants.cabifyRate.variableMax - constants.cabifyRate.variableMin + 1)) + constants.cabifyRate.variableMin),
          },
        uber: {
          wayPoints:[],
          totalDistance: drivingJourney.distance.value,
          totalTime: drivingJourney.duration.value + constants.waitingTime.uber,
          totalCalories: 0,
          co2: (drivingJourney.distance.value/1000)*constants.co2Consumption.uber,
          cost: constants.uberRate.fix + (drivingJourney.distance.value/1000)*(Math.floor(Math.random() * (constants.uberRate.variableMax - constants.uberRate.variableMin + 1)) + constants.uberRate.variableMin),
        }
      }
      ]
    }
  })

  module.exports = {
    vtcRequest
  }