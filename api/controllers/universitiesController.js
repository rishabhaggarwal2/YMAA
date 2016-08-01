const _ = require('lodash')
const School = require('../models/Schools')
const ListOfSchools = require('../models/ListOfSchools')
const AWS = require('aws-sdk')
const validator = require('validator')
// For simplicities sake, resolve all Promises here and send back data if needed

//heroku init push

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
    if (parameters.team) school.team = parameters.team

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
  uploadProfilePicture: (req, res) => {
    AWS.config.update({accessKeyId: config.AWS_ACCESS_KEY, secretAccessKey: config.AWS_SECRET_KEY})
    const ymaa_bucket = new AWS.S3({params: {Bucket: config.S3_BUCKET}})
    const options = {
      Bucket: S3_BUCKET,
      Key: req.query.name,
      ContentType: req.query.type,
      ACL: 'public-read'
    }

    ymaa_bucket.getSignedUrl('putObject', options, function(err, data){
      if(err){
        console.log("Upload ERROR:", err)
      }
      else{
        const return_data = {
          signed_request: data,
          url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + req.query.name
        }
        res.write(JSON.stringify(return_data))
        res.end()
      }
    })
  },
  updateSchool: (req, res) => {
    // update based on available parameters
    const updateData = req.body.updateData
    const schoolName = req.body.name
    School.find({name: schoolName}, (schoolDoc) => {
      const school = schoolDoc
      const keys = _.keys(updateData)

      keys.forEach((key) => {
        school[key] = updateData[key]
      })

      school.save().then((doc) => {
        res.status(200).send('School update: SUCCESS')
      }, (err) => {
        res.status(401).send('School update: ERROR', err)
      })
    }, (err) => {
      res.status(401).send('School not found', err)
    })
  }
}
