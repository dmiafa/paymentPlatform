var express = require('express');
var router = express.Router();

var stripe = require("stripe")("sk_test_4O3fNOkRCHRclCFelo0yBvYE");

/* POST home page */
router.post('/', function(req, res) {
  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    card: stripeToken,
    description: "payinguser@example.com"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
  res.render('paid', {});
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'NYC Loft Party'
  });
});

module.exports = router;