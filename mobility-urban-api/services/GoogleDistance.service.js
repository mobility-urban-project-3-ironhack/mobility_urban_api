require('dotenv').config()
const axios = require('axios')
const constants = require('../constants/constants')

const http = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/directions/'
})

const request = (origin, destination,transitMode,publicTransit) => http.get('/json',{
  params: {
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    mode: transitMode,
    key: process.env.GOOGLE_DIRECTIONS_API_KEY,
    transit_mode: `${publicTransit ? publicTransit : ''}`
  }
}).then(res => res.data.routes[0].legs[0])
// }).then(res => res.data)

// esta petición auna todas la peticiones para formar el camino de las bicis

const bikeRequest = (origin,destination,decks) => Promise.all([
    request(origin,decks.originDeck,'walking'),
    request(decks.originDeck,decks.destinationDeck,'bicycling'),
    request(decks.destinationDeck,destination,'walking'),
  ])
    .then(([walkingInit,bicycling,walkingFinal]) => {
      return {
        bicycling: {
          wayPoints:[{
            transitMode: 'walking',
            distance: walkingInit.distance.value,
            time: walkingInit.duration.value,
            wayPoint: {
              lat:decks.originDeck.lat,
              lng: decks.originDeck.lng
            }, 
            additionalInfo : {}
          },
          {
            transitMode: 'bicycling',
            distance: bicycling.distance.value,
            time: bicycling.duration.value,
            wayPoint: {
              lat:decks.destinationDeck.lat,
              lng: decks.destinationDeck.lng
            },
            additionalInfo : {}
          },
          {
            transitMode: 'walking',
            distance: walkingFinal.distance.value,
            time: walkingFinal.duration.value,
            wayPoint:{
              ...destination
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

const getDirections = (origin,destination,decks) => Promise.all([
  request(origin,destination,'walking'),
  bikeRequest(origin,destination,decks),
  request(origin,destination,'driving'),
  request(origin,destination,'transit','bus'),
  request(origin,destination,'transit','subway')
])
  .then(([walkingJourney, bicyclingJourney, drivingJourney,transitJourneyBus,transitJourneySubway]) => {
    return {
      driving: {
        wayPoints: [],
        totalDistance: drivingJourney.distance.value,
        totalTime: drivingJourney.duration.value,
        totalCalories: 0,
        co2: (drivingJourney.distance.value/1000)*constants.co2Consumption.car,
        cost: (drivingJourney.distance.value/1000)*constants.fuelConsumption*constants.fuelPrice.diesel,
        //regular si el coche de la persona fuera diesel o gasolina
      },
      ... bicyclingJourney,
      walking: {  
        wayPoints: [],
        totalDistance: walkingJourney.distance.value,
        totalTime: walkingJourney.duration.value,
        totalCalories: walkingJourney.duration.value*constants.caloriesSecond.walking,
      },  
      bus: {
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
      },
      subaway: {
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
      },
    }
  })

// el CO2 estaría guay meterlo con el consumo de la persona que el coche que mete
// cost tambien y calorias
// en calories er si hay algo andando y cuanto supone eso en tiempo y distancia en el transporte publico.


module.exports = {getDirections,
request,
bikeRequest}