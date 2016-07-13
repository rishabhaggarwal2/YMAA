const _ = require('lodash')
const School = require('../models/Schools')
const ListOfSchools = require('../models/ListOfSchools')

// For simplicities sake, resolve all Promises here and send back data if needed

module.exports = {
  getSchoolData: (req, res) => {
    const schoolName = req.params.school_name
    School.find({name: schoolName}, (doc) => {
      console.log('School Doc', doc)
      res.status(200).send(doc)
    }, (err) => {
      res.status(401).send('School not available.', err)
    })
  },
  saveSchool: (req, res) => {
    const parameters = req.body.data
    const school = new School()
    const listEntry = new ListOfSchools()
    if (parameters.name) {
      school.name = parameters.name
      listEntry.name = parameters.name
    }
    if (parameters.impact) school.impact = parameters.impact
    if (parameters.fb_link) school.fb_link = parameters.fb_link
    if (parameters.twitter_link) school.twitter_link = parameters.twitter_link
    if (parameters.instagram_link) school.instagram_link = parameters.instagram_link
    if (parameters.team) schoo.team = parameters.team

    Promise.all([
      school.save(),
      listEntry.save()
    ]).then((values) => {
      schoolDoc = values[0]
      listEntryDoc = values[1]

      if (schoolDoc) {
        res.status(200).send('Save School: SUCCESS')
      } else {
        res.status(401).send('Save School: ERROR')
      }

      if (listEntryDoc) {
        res.status(200).send('Save listEntry: SUCCESS')
      } else {
        res.status(401).send('Save listEntry: ERROR')
      }
    }, (errors) => {
      res.status(401).send('Something did not save', errors)
    })
  },
  updateSchool: (req, res) => {
    // update based on available parameters
    const updateData = req.body.updateData
    const schoolName = req.body.name
    School.find({name: schoolName}, (schoolDoc) => {
      const school = schoolDoc
      _.mapKeys(updateData, (value, key) => {
        school[key] = value
      })
      res.status(200).send('School update: SUCCESS')
    }, (err) => {
      res.status(401).send('School not found', err)
    })
  }
}
