const mongoose = require('mongoose')

const TRANS_METHODS = ['vtc-cabify', 'moto-movo', 'scooter-movo', 'bike-bicimad', 'car-car2go']

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
}, { timestamps: true })

// verificar como devuelven las apis el precio, 
// lo ideal es guardarlo en number

journeySchema.index({ location: '2dsphere' });

const Journey = mongoose.model('Journey', journeySchema)

module.exports = Journey;