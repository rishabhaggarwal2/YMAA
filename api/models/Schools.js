'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Schema for Schools
 *
 * Contains the following fields:
 * - Name
 * - Impact Paragraph
 * - FB Link
 * - Twitter Link
 * - Instagram Link
 * - Recent Events
 * - Upcoming Events
 * - Team
 * - News Articles
 * - Adress
   recent_events: [{type: String, required: false}],
  upcoming_events: [{type: String, required: false}],
   news_articles: [{type: String, required: false}],
 */

const schoolSchema = new Schema({
  name: {type: String, required: true, index: true},
  impact: {type: String, required: false},
  address: {type: String, required: false},
  fb_link: {type: String, required: false},
  twitter_link: {type: String, required: false},
  instagram_link: {type: String, required: false},
  team: [{first_name: String, last_name: String, prof_url: String, required: false}]
})

const School = mongoose.model('School', schoolSchema)
module.exports = School
