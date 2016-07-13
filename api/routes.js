'use strict'

const express = require('express')
let router = express.Router()
const config = require('../config')

// Controllers

const universitiesController = require('./controllers/universitiesController')
const paymentsController = require('./controllers/paymentsController')

router.get('/:school_name', universitiesController.getSchoolData)
router.post('/addSchool', universitiesController.addSchool)
router.post('/donate', paymentsController.donate)

module.exports = router
