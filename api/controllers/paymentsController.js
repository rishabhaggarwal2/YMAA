const config = require('../../config')
const stripe = require('stripe')(config.STRIPE_KEY)

module.exports = {
  donate: (req, res) => {
    const chargeData = req.body
    stripe.charge.create(chargeData, (err, receipt) => {
      if (err) {
        res.status(401).send('Donation ERROR', err)
      }
      res.status(200).send('Donation SUCCESS', receipt)
    })
  }
}
