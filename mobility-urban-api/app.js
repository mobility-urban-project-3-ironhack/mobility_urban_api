const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors')
const mongoose = require('mongoose')

require('./configs/db.config')

const authRouter = require('./routes/auth.routes');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);

// Error 404
app.use((req, res, next)=>{
  next(createError(404, 'Action not found'))  //podemos predefinir el mensaje del error 404
})

// Error handling (manejo de errores)
app.use((error,req, res, next)=>{
  console.error(error) //puedo ver en terminal el error que hay
  res.status(error.status || 500)  // le pongo yo un estado si ya es un error me lo quedo y sino le pongo error 500

  const data = {}                 // lo parseamos para que muestre 
  data.message = error.message    //  message: 'error'
  if(error instanceof mongoose.Error.ValidationError) {
    res.status(400)
    data.errors = {}
    Object.keys(error.errors)                                             // hacemos un objeto clave:valor de
      .forEach(field => data.errors[field] = error.errors[field].message) // error: mensaje
  }

  res.json(data)  // muestro errorr.
})

module.exports = app;
