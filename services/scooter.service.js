const googleService = require('./google.service')
const constants = require('../constants/constants')

//hacer variables las constantes para que hay diferentes servicios de moto (movo, lime, etc,etc)


const randomLocation = require('random-location')

const generateRandomString =(string_length) =>{
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

const randomLocationCoor = (origin) => {
  const coord = randomLocation.randomCirclePoint({latitude:origin.lat,longitude:origin.lng
  },constants.randomRadius)
  return {
    lat:coord.latitude,
    lng:coord.longitude
  }
}

const randomLocationGenerator = (origin) => [randomLocationCoor(origin),randomLocationCoor(origin),randomLocationCoor(origin)]



const scooterRequest = (origin,destination,location,provider) => Promise.all([
  googleService.request(origin,location,'walking'),
  googleService.request(location,destination,'driving')
])
  .then(([walkingJourney, motoJourney]) => {
    return {
      wayPoints:[{
        transitMode: 'walking',
        distance: walkingJourney.distance.value,
        time: walkingJourney.duration.value,
        wayPoint: {
          lat: walkingJourney.end_location.lat,
          lng: walkingJourney.end_location.lng
        }, 
        additionalInfo : {}
      },
      {
        transitMode: 'scooter',
        distance: motoJourney.distance.value,
        time: motoJourney.duration.value,
        wayPoint: {},
        additionalInfo : {
          plate: `M#${generateRandomString(2)}${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`,
          batery : Math.floor(Math.random() * (100 - 50 + 1)) + 50
        }
      },],
    totalDistance: walkingJourney.distance.value + motoJourney.distance.value,
    totalTime: walkingJourney.duration.value + motoJourney.duration.value,
    totalCalories: (walkingJourney.duration.value)*constants.caloriesSecond.walking,
    co2: 0,
    cost: constants[`${provider}ScooterRate`].fix + (motoJourney.duration.value/60)*constants[`${provider}ScooterRate`].var ,
    }
  })

  const totalScooterOptions = (origin,destination,provider) => Promise.all(randomLocationGenerator(origin).map(location => scooterRequest(origin,destination,location,provider)))
    .then(([option1,option2,option3]) => {
      return {
        [provider] : [{
          ...option1
        },{
          ...option2
        },{
          ...option3
        }]
      }
    })

    const totalScooterRequest = (origin,destination) => Promise.all([
      totalScooterOptions(origin,destination,'movo'),
      totalScooterOptions(origin,destination,'lime'),
      totalScooterOptions(origin,destination,'jump')
    ])
      .then(([movoJourney,limeJourney,jumpJourney]) => {
        return {
          scooter : [{
            ...movoJourney,
            ...limeJourney,
            ...jumpJourney
          }]
        }
      })


module.exports = {totalScooterRequest}