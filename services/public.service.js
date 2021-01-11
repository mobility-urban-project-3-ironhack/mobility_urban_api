const constants = require('../constants/constants')
const googleService = require('./google.service')

const publicRequest = (origin,destination) => Promise.all([
  googleService.request(origin,destination,'walking'),
  googleService.request(origin,destination,'driving'),
  googleService.request(origin,destination,'transit','bus'),
  googleService.request(origin,destination,'transit','subway')
])
.then(([walkingJourney, drivingJourney,transitJourneyBus,transitJourneySubway]) => {
  return {
    driving: [{
      wayPoints: [],
      totalDistance: drivingJourney.distance.value,
      totalTime: drivingJourney.duration.value,
      totalCalories: 0,
      co2: (drivingJourney.distance.value/1000)*constants.co2Consumption.car,
      cost: (drivingJourney.distance.value/1000)*constants.fuelConsumption*constants.fuelPrice.diesel,
      //regular si el coche de la persona fuera diesel o gasolina
    }],
    walking: [{  
      wayPoints: [],
      totalDistance: walkingJourney.distance.value,
      totalTime: walkingJourney.duration.value,
      totalCalories: walkingJourney.duration.value*constants.caloriesSecond.walking,
      co2: 0,
      cost: 0,
    }],  
    bus: [{
      wayPoints: transitJourneyBus.steps.map(step => {
        return {
            transitMode: step.travel_mode,
            distance: step.distance.value,
            time: step.duration.value,
            wayPoint: {
              lat:step.end_location.lat,
              lng: step.end_location.lng
            }, 
            additionalInfo : {
              transitType: step.travel_mode == 'TRANSIT' ? step.transit_details.line.vehicle.name : '',
              line: step.travel_mode == 'TRANSIT' ? step.transit_details.line.short_name : '',
              numStops : step.travel_mode == 'TRANSIT' ? step.transit_details.num_stops : ''
            }
        }
      }),
      totalDistance: transitJourneyBus.distance.value,
      totalTime: transitJourneyBus.duration.value,
      totalCalories: 0,
      co2:0,
      cost: constants.busRate
    }],
    subway: [{
      wayPoints: transitJourneySubway.steps.map(step => {
        return {
            transitMode: step.travel_mode,
            distance: step.distance.value,
            time: step.duration.value,
            wayPoint: {
              lat:step.end_location.lat,
              lng: step.end_location.lng
            }, 
            additionalInfo : {
              transitType: step.travel_mode == 'TRANSIT' ? step.transit_details.line.vehicle.name : '',
              line: step.travel_mode == 'TRANSIT' ? step.transit_details.line.short_name : '',
              numStops : step.travel_mode == 'TRANSIT' ? step.transit_details.num_stops : ''
            }
        }
      }),
      totalDistance: transitJourneySubway.distance.value,
      totalTime: transitJourneySubway.duration.value,
      totalCalories: 0,
      co2: 0,
      cost: constants.subwayRate.fix
    }]
  }
})

module.exports = { publicRequest }