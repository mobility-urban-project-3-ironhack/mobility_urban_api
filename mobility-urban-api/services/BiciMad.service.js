const axios = require('axios')
const geolib = require('geolib')

const http = axios.create({
  baseURL :'https://api.citybik.es/v2/networks'
})

const getBikeStation = () => http.get('/bicimad')
  .then(res => {
     return res.data.network.stations.map(station => {
      return { 
        lat:station.latitude,
        lng:station.longitude
      }
    })
  })

const getNearestStation = (coordinates) => {
  return getBikeStation()
    .then(stations => geolib.findNearest(coordinates,stations))
}

module.exports = {
  getBikeStation,
  getNearestStation
}


