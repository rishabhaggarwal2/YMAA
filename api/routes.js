'use strict'

const express = require('express')
let router = express.Router()
const config = require('../config')

// router.get('/', function (req, res){
//   res.render('index');
// });

// router.get('/:page_name', function (req, res) {
//   var pageName = req.params.page_name;
//   res.render('/' + pageName);
// });

// var applicationController = require('./controllers/applicationController');
// var donateController = require('./controller/donateController');

// router.post('/apply', applicationController.submitForm);
// router.post('/donate', applicationController.donate);

module.exports = router
