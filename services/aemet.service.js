
const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.AEMET_API_KEY;
const locationCodes = require('../data/aemet-locations.json');

const http = axios.create({
  baseURL: 'https://opendata.aemet.es/opendata/api',
  headers: {
    Accept: 'application/json',
    api_key: API_KEY
  }
});


const getWeather = () => {
  const code = '28079';
  return http.get(`/prediccion/especifica/municipio/diaria/${code}`)
    .then(res => {
      if (res.data.estado === 404) {
        throw new Error('Location not found')
      } else {
        return axios.get(res.data.datos);
      }
    })
    .then(res => res.data)
 
    // .then(res => {
    //   const data = res.data[0] || { prediccion: { dia: [] }};
    //   return data.prediccion.dia.map((info) => {
    //     console.log(info)
    //     return {
    //       wind: info.viento,
    //       date: new Date(info.fecha)
    //     }
    //   })
    // })
}

module.exports = {getWeather}