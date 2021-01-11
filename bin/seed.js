require('../configs/db.config')

const User = require('../models/user.model')
const Journey = require('../models/journey.model')
const mongoose = require('mongoose')

const randomLocation = require('random-location')

const transportationMethod = ['vtc-cabify','vtc-uber', 'moto-movo','moto-ecooltra','moto-acciona', 'scooter-movo','scooter-lime','scooter-jump','bike-bicimad', 'carsharing-car2go',
'carsharing-zity','carsharing-wible','subway','bus','walking','car','taxi']

const userId = ['5d110c4e885ea4d2c71b9906','5d111c68014efbdb9dbd908b','5d171bbbeb0c75082d46f70e']


const randomLocationCoor = (origin) => {
  const coord = randomLocation.randomCirclePoint({latitude:origin.lat,longitude:origin.lng
  },2500)
  return {
    lat:coord.latitude,
    lng:coord.longitude
  }
}

const point = {
  lat: 40.450395,
  lng: -3.684492
}

const generateRandomData = () => {
  for (var i = 0; i<7; i++) {
  
      const data = {
        origin : randomLocationCoor(point),
        destination : randomLocationCoor(point),
        userID : userId[Math.floor(Math.random()*(2-0+1)+0)],
        method : transportationMethod[Math.floor(Math.random()*(16-0+1)+0)],
        price: Math.random()*(20-1+1)+1,
        duration: Math.floor(Math.random()*(5000-300+1)+300),
        calories: (Math.random()*(300-5+1)+5),
        co2: (Math.random()*(300-10+1)+10),
       createdAt: new Date(`2019-7-${Math.floor(Math.random()*(20-0+1)+0)}`),
      //  createdAt: new Date(`2019-${i+1}-${Math.floor(Math.random()*(20-0+1)+0)}`),
      }
  
      const journey = new Journey(data)
      journey.save()
        .then(res => console.log(res))

  }
}

generateRandomData()

