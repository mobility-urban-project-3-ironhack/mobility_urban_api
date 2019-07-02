const axios = require('axios')



const bikeCaloriesConsupmtionsPerSecond = 0.1
const walkingCaloriesConsupmtionsPerSecond = 0.05


const http = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/directions/'
})

const request = (origin, destination,transitMode) => http.get('/json',{
  params: {
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    mode: transitMode,
    key: process.env.GOOGLE_DIRECTIONS_API_KEY
  }
}).then(res => res.data.routes[0].legs)

const getDirections = (origin,destination) => Promise.all([
  request(origin,destination,'driving'),
  request(origin,destination,'bicycling'),
  request(origin,destination,'walking'),
  request(origin,destination,'transit')
  // sería necesario diferenciar entre bus y metro.
]).then(([driving, bicycling, walking,transit]) => {
  return {
    driving: {
      distance: driving[0].distance.value,
      time: driving[0].duration.value,
      calories: 0
    },
    bicycling: {
      distance: bicycling[0].distance.value,
      time: bicycling[0].duration.value,
      calories: bicycling[0].duration.value*bikeCaloriesConsupmtionsPerSecond
    },
    walking: {  
      distance: walking[0].distance.value,
      time: walking[0].duration.value,
      calories: walking[0].duration.value*walkingCaloriesConsupmtionsPerSecond},
    transit: {
      distance: transit[0].distance.value,
      time: transit[0].duration.value,
      calories: 0
    }
  }
})

// el CO2 estaría guay meterlo con el consumo de la persona que el coche que mete
// cost tambien y calorias
// en calories er si hay algo andando y cuanto supone eso en tiempo y distancia en el transporte publico.


module.exports = {getDirections}