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
router.post('/upload_profile_picture', universitiesController.uploadProfilePicture)
router.post('/donate', paymentsController.donate)
router.post('/add_social_media/:school_name', universitiesController.addSocialMediaLinks)
router.get('/list_of_schools', universitiesController.getListOfSchools)

module.exports = router
