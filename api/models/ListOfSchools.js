'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Schema for ListOfSchools
 *
 * Contains the following fields:
 * - School Name and that's it
 */

const listSchema = new Schema({
  name: { type: String, required: true, index: true },
  state: { type: String, required: true},
  address: { type: String, required: true },
  verified: {type: String, required: false}
})

const ListOfSchools = mongoose.model('ListOfSchools', listSchema)
module.exports = ListOfSchools
