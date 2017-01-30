const _ = require('lodash')
const School = require('../models/Schools')
const ListOfSchools = require('../models/ListOfSchools')
const AWS = require('aws-sdk')
const validator = require('validator')
const CONFIG = require('../../config')
AWS.config.region = 'us-west-2';
// For simplicities sake, resolve all Promises here and send back data if needed

//heroku init push

module.exports = {
  getSchoolData: (req, res) => {
    const schoolName = req.params.school_name
    console.log(schoolName);
    School.find({name: schoolName}, (err, doc) => {
      console.log('School Doc', doc)
      res.status(200).send(doc)
    }, (err) => {
      res.status(401).send('School not available.', err)
    })
  },
  saveSchool: (req, res) => {
    const parameters = req.body.school_info
    const school = new School()
    const listEntry = new ListOfSchools()
    if (parameters.name) {
      school.name = parameters.name
      listEntry.name = parameters.name
    }
    if (parameters.password) school.password = parameters.password
    if (parameters.impact) school.impact = parameters.impact
    if (parameters.verified) {
      school.verified = parameters.verified
      listEntry.verified = parameters.verified
    }
    if (parameters.background) school.background = parameters.background
    if (parameters.prevFunds) school.prevFunds = parameters.prevFunds
    if (parameters.fundGoals) school.fundGoals = parameters.fundGoals
      
    if (parameters.fb_link) school.fb_link = parameters.fb_link
    if (parameters.instagram_link) school.instagram_link = parameters.instagram_link
    if (parameters.twitter_link) school.twitter_link = parameters.twitter_link

    if (parameters.state) {
      school.state = parameters.state
      listEntry.state = parameters.state
    }
    if (parameters.address) { 
      school.address = parameters.address
      listEntry.address = parameters.address
    }
    if (parameters.calendar) school.calendar = parameters.calendar
    if (parameters.galleria) school.galleria = parameters.galleria
    // if (parameters.mediaLinks) {
    //   mediaLinks.forEach((obj) => {
    //     school.social_media_links.push(obj)
    //   })
    // }
    if (parameters.team) school.team = parameters.team
    if (parameters.news) school.news = parameters.news

    Promise.all([
      school.save(),
      listEntry.save()
    ]).then((values) => {
      schoolDoc = values[0]
      listEntryDoc = values[1]
      console.log('success saving')
      if (schoolDoc && listEntryDoc) {
        res.status(200).send('Save docs: SUCCESS')
      } else {
        res.status(401).send('Save docs: ERROR')
      }
    }, (errors) => {
      res.status(401).send('Something did not save', errors)
    })
  },
  getListOfSchools: (req, res) => {
    ListOfSchools.find({}, (err, doc) => {
      res.status(200).send(doc)
    }, (err) => {
      res.status(400).send('List of Schools unavailable', err)
    })
  },
  addSocialMediaLinks: (req, res) => {
    const schoolName = req.params.school_name
    const mediaLinks = req.body.media
    School.find({name: schoolName}, (err, doc) => {
      mediaLinks.forEach((obj) => {
        doc.social_media_links.push(mediaLinks)
      })
      doc.save((err) => {
        if (err) {
          res.status(400).send('could not save school', err)
        } else {
          res.status(200).send('successfully added social media links')
        }
      })
    }, (err) => {
      res.status(400).send('could not find school', err)
    })

  },
  uploadProfilePicture: (req, res) => {
    console.log(CONFIG);

    AWS.config.update({accessKeyId: CONFIG.AWS_ACCESS_KEY, secretAccessKey: CONFIG.AWS_SECRET_KEY, region: 'us-west-2', signatureVersion: 'v4'})
    AWS.config.paramValidation = false;

    const ymaa_bucket = new AWS.S3({params: {Bucket: CONFIG.S3_BUCKET}})

    buf = new Buffer(req.body.picture.replace(/^data:image\/\w+;base64,/, ""),'base64')

    const options = {
      Bucket: CONFIG.S3_BUCKET,
      Key: req.body.name,
      ContentType: req.body.type,
      ContentEncoding: 'base64',
      Body: buf,
      ACL: "public-read",
    }

    ymaa_bucket.putObject(options, (err, resp) => {
      if (err) {
        console.log('UPLOAD ERROR', err)
        res.status(200).send('upload file: ERROR')
      } else {
        console.log('success', resp)
        res.status(200).send(resp)
      }
    })

    // ymaa_bucket.upload(options, (err, resp) => {
    //   if (err) {
    //     console.log('UPLOAD ERROR', err)
    //     res.status(200).send('upload file: ERROR')
    //   } else {
    //     console.log('success nigga', resp)
    //     res.status(200).send(resp)
    //   }
    // })

    // s3.upload(options, function (err, res) {
    //   if (err) {
    //     console.log("Error uploading data: ", err);
    //   } else {
    //     console.log("Successfully uploaded data to myBucket/myKey", res);
    //   }
    // });

    // ymaa_bucket.getSignedUrl('putObject', options, function(err, data){
    //   if(err){
    //     console.log("Upload ERROR:", err)
    //   }
    //   else{
    //     const return_data = {
    //       signed_request: data,
    //       url: 'https://' + CONFIG.S3_BUCKET + '.s3.amazonaws.com/' + req.params.name
    //     }
    //     console.log('return_data', return_data)
    //     res.write(JSON.stringify(return_data))
    //     res.end()
    //   }
    // })
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
