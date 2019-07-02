const googleService = require('./services/Google.service')
require('dotenv').config()

googleService.getDirections()
  .then(data => console.log((data)))
  .catch(error => console.error(error))