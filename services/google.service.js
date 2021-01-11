const axios = require('axios')

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

module.exports = {
  request
}