const bikeService = require('./bike.service')
const publicService = require('./public.service')
const vtcService = require('./vtc.service')
const taxiService = require('./taxi.service')
const motoService = require('./moto.service')
const scooterService = require('./scooter.service')
const carSharingService = require('./carSharing.service')

const totalRequest = (origin,destination) => Promise.all([
  bikeService.bikeRequest(origin,destination),
  publicService.publicRequest(origin,destination),
  vtcService.vtcRequest(origin,destination),
  taxiService.taxiRequest(origin,destination),
  motoService.totalMotoRequest(origin,destination),
  scooterService.totalScooterRequest(origin,destination),
  carSharingService.totalCarSharingRequest(origin,destination),
])
  .then(([bikeJourney,publicJourney,vtcJourney,taxiJourney,motoJourney,scooterJourney,carSharingJourney]) => {
    return {
      ...bikeJourney,
      ...publicJourney,
      ...vtcJourney,
      ...taxiJourney,
      ...motoJourney,
      ...scooterJourney,
      ...carSharingJourney
    }
  })

  module.exports = {
    totalRequest
  }