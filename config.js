module.exports = {
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  MONGOURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/YMAA',
  S3_BUCKET: process.env.S3_BUCKET,
  STRIPE_KEY: 'test-key'
}
