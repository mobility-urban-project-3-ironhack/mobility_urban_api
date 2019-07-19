const mongoose = require('mongoose')

const TRANS_METHODS = ['vtc-cabify','vtc-uber', 'moto-movo','moto-ecooltra','moto-acciona', 'scooter-movo','scooter-lime','scooter-jump','bike-bicimad', 'carsharing-car2go',
'carsharing-zity','carsharing-wible','subway','bus','walking','car','taxi']

const journeySchema = new mongoose.Schema({
  origin:{
    location: {
      lat: Number,
      lng: Number,
    },
    address: String,
  },
  destination:{
    location: {
      lat: Number,
      lng: Number,
    },
    address: String,
  },
  userID: { type: mongoose.Types.ObjectId, ref: 'User' },
  method: {
    type: String,
    enum: TRANS_METHODS
  },
  price: Number,
  duration: Number,
  calories: Number,
  co2: Number
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc,ret) => {
      ret.id = doc._id
      delete ret._id
      delete ret.password
      delete ret.__v
      return ret
    }
  }
 })

// verificar como devuelven las apis el precio, 
// lo ideal es guardarlo en number

journeySchema.index({ location: '2dsphere' });

const Journeys = mongoose.model('Journeys', journeySchema)

module.exports = Journeys;