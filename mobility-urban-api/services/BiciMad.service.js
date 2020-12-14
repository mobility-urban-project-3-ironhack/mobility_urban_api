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

// igual deberiamos retornar tambien available bicis y puestos libres para dejar la bici

const getNearestStation = (coordinates) => {
  return getBikeStation()
    .then(stations => geolib.findNearest(coordinates,stations))
}

const getOriginDestDecks = (origin,destination) => Promise.all([
  getNearestStation(origin),
  getNearestStation(destination),
])
  .then(([originDeck,destinationDeck]) => {
    return {
      originDeck: {
        lat: originDeck.lat,
        lng:originDeck.lng
      },
      destinationDeck: {
        lat:destinationDeck.lat,
        lng: destinationDeck.lng
      }  
    }
  })

module.exports = {
  getOriginDestDecks
}


