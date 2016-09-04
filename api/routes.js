'use strict'

const express = require('express')
let router = express.Router()
const config = require('../config')

// Controllers

const universitiesController = require('./controllers/universitiesController')
const paymentsController = require('./controllers/paymentsController')

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/school/:school_name', universitiesController.getSchoolData)
router.post('/save_school', universitiesController.saveSchool)
router.post('/upload_profile_picture/:name', universitiesController.uploadProfilePicture)
router.post('/donate', paymentsController.donate)

module.exports = router
