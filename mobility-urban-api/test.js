const googleService = require('./services/GoogleDistance.service')

const origin = {
  "lat":40.382444,
  "lng":-3.703449
}

const destination = {
  "lat":40.413866,
  "lng":-3.701186
}

googleService.request(origin,destination,'transit','bus')
  .then(res => console.log(res[0].steps))
  .catch(error => console.error(error))