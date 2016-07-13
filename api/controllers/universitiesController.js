const _ = require('lodash')
const School = require('../models/Schools')

// For simplicities sake, resolve all Promises here and send back data if needed

module.exports = {
  getSchoolData: (req, res) => {
    const schoolName = req.params.school_name
    School.find({name: schoolName}, (doc) => {
      console.log('School Doc', doc)
      res.status(200).send(doc)
    }, (err) => {
      res.status(401).send('School not available.')
    })
  },
  saveSchool: (req, res) => {
    const parameters = req.body
    const school = new School()
    if (parameters.name) school.name = parameters.name
    if (parameters.impact) school.impact = parameters.impact
    if (parameters.fb_link) school.fb_link = parameters.fb_link
    if (parameters.twitter_link) school.twitter_link = parameters.twitter_link
    if (parameters.instagram_link) school.instagram_link = parameters.instagram_link
    if (parameters.team) schoo.team = parameters.team

    school.save().then((doc) => {
      res.status(200).send('Save School: SUCCESS')
    }, (err) => {
      res.status(401).send('Save School: ERROR')
    })
  },
  updateSchool: (req, res) => {
    // update based on available parameters
  }
}
