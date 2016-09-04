const express = require('express')
const path = require('path')
const multer = require('multer')
const bodyParser = require('body-parser')
const config = require('./config')

// Initialize Express App with routes

const app = new express()
const routes = require('./api/routes')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'html')
app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)

app.set('port', (process.env.PORT || 8000))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next()
})
app.use('/', routes)

// Mongo configuration

const mongoose = require('mongoose')
mongoose.connect(config.MONGOURL, (error) => {
  if (error) {
    console.error('Mongoose Connection: ERROR')
    throw error;
  }
  console.log('Mongoose Connection: Success')
})

// Fire up app

app.listen(app.get('port'), () => {
  console.log('YMAA app is running on port', app.get('port'))
})
