require('dotenv').config()

const caloriesSecond = {
  walking:Number(process.env.WALKING_CALORIES_SECOND),
  bike: Number(process.env.BIKE_CALORIES_SECOND)
}


const co2Consumption = {
  taxi: Number(process.env.TAXI_CO2_CONSUMPTION),
  car: Number(process.env.OWN_CAR_CO2_CONSUMPTION),
  cabify: Number(process.env.CABIFY_CO2_CONSUMPTION),
  uber: Number(process.env.UBER_CO2_CONSUMPTION),
  movoMoto: Number(process.env.MOVO_MOTO_CO2_CONSUMPTION),
  movoScooter: Number(process.env.MOVO_SCOOTER_CO2_CONSUMPTION)

}

const fuelConsumption = {
  diesel: Number(process.env.DIESEL_CONSUMPTION),
  gas: Number(process.env.GAS_CONSUMPTION)
}

const fuelPrice = {
  diesel:Number(process.env.DIESEL_PRICE),
  gas:Number(process.env.GAS_PRICE)
}

const taxiRate = {
  fix: Number(process.env.TAXI_FIX_RATE),
  variable: Number(process.env.TAXI_KM_RATE)
}

const uberRate = {
  fix: Number(process.env.UBER_FIX_RATE),
  variableMax : Number(process.env.UBER_KM_RATE_MAX),
  variableMin : Number(process.env.UBER_KM_RATE_MIN),
}

const cabifyRate = {
  fix: Number(process.env.UBER_FIX_RATE),
  variableMax: Number(process.env.CABIFY_KM_RATE_MAX),
  variableMin: Number(process.env.CABIFY_KM_RATE_MIN),
}

const biciMadRate = Number(process.env.BICIMAD_HOUR_RATE)

const busRate = Number(process.env.BUS_FIX_RATE)

const subwayRate = {
  fix: Number(process.env.METRO_FIX_RATE),
  variable:Number(process.env.METRO_STA_RATE),
  max: Number(process.env.METRO_MAX_RATE)
}

const waitingTime = {
  cabify: Number(process.env.CABIFY_WAIT_TIME),
  uber: Number(process.env.UBER_WAIT_TIME),
  taxi: Number(process.env.TAXI_WAIT_TIME),
}

const randomRadius = Number(process.env.RANDOM_RADIUS)

const movoMotoRate = {
  fix: Number(process.env.MOVO_MOTO_FIX_RATE),
  var: Number(process.env.MOVO_MOTO_VAR_RATE)
}

module.exports = {
  caloriesSecond,
  co2Consumption,
  fuelConsumption,
  fuelPrice,
  taxiRate,
  uberRate,
  cabifyRate,
  biciMadRate,
  busRate,
  subwayRate,
  waitingTime,
  randomRadius,
  movoMotoRate
}






















