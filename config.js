module.exports = {
  AWS_ACCESS_KEY: 'test-key',
  AWS_SECRET_KEY: 'test-secret-key',
  MONGOURL: process.env.MONGO_URI,
  // MONGOURL: process.env.MONGO_URI || 'mongodb://localhost:27017/YMAA',
  S3_BUCKET: 'name-of-bucket',
  STRIPE_KEY: 'test-key'
}
