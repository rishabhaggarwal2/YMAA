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
  name: { type: String, required: true, index: true },
  password: { type: String, required: true},  //
  verified: { type: String, required: false},  //
  background: { type: String, required: false}, //
  impact: { type: String, required: false },
  prevFunds: { type: String, required: false },
  fundGoals: { type: String, required: false },
  address: { type: String, required: true },
  state: { type: String, required: true },
  calendar: { type: String, required: false },
  fb_link: { type: String, required: false },
  twitter_link: { type: String, required: false },
  instagram_link: { type: String, required: false },
  team: [{ name: String, position: String, prof_url: String, required: false }],
  news: [{ title: String, date: String, article_url: String, image_url: String, required: false }]
})

const School = mongoose.model('School', schoolSchema)
module.exports = School
