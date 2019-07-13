const googleService = require('./google.service')
const constants = require('../constants/constants')

const taxiRequest = (origin,destination) => googleService.request(origin,destination,'driving')
  .then(drivingJourney => {
    return {
      taxi: {
        wayPoints:[],
        totalDistance: drivingJourney.distance.value,
        totalTime: drivingJourney.duration.value + constants.waitingTime.taxi,
        totalCalories: 0,
        co2: (drivingJourney.distance.value/1000)*constants.co2Consumption.taxi,
        cost: constants.taxiRate.fix + (drivingJourney.distance.value/1000)*constants.taxiRate.variable
      } 
    }
  })



  module.exports = {
    taxiRequest
  }