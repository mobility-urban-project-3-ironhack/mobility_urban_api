const googleService = require('./google.service')
const constants = require('../constants/constants')

const randomLocation = require('random-location')

const generateRandomString =(stringLength) =>{
  let random_string = '';
  let random_ascii;
  let ascii_low = 65;
  let ascii_high = 90
  for(let i = 0; i < string_length; i++) {
      random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
      random_string += String.fromCharCode(random_ascii)
  }
  return random_string
}

  const randomLocations = [randomLocation.randomCirclePoint(origin,constants.randomRadius),
    randomLocation.randomCirclePoint(origin,constants.randomRadius),
    randomLocation.randomCirclePoint(origin,constants.randomRadius)]

const motoRequest = (origin,destination) => Promise.all(randomLocations.map(loc => googleService.request()))