const bikeService = require('./bike.service')
const publicService = require('./public.service')
const vtcService = require('./vtc.service')
const taxiService = require('./taxi.service')

const totalRequest = (origin,destination) => Promise.all([
  bikeService.bikeRequest(origin,destination),
  publicService.publicRequest(origin,destination),
  vtcService.vtcRequest(origin,destination),
  taxiService.taxiRequest(origin,destination)
])
  .then(([bikeJourney,publicJourney,vtcJourney,taxiJourney]) => {
    return {
      ...bikeJourney,
      ...publicJourney,
      ...vtcJourney,
      ...taxiJourney
    }
  })

  module.exports = {
    totalRequest
  }