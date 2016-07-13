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
  name: {type: String, required: true, index: true}
})

const ListOfSchools = mongoose.model('ListOfSchools', listSchema)
module.exports = ListOfSchools
