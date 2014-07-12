var express = require('express');
var router = express.Router();

var stripe = require("stripe")("sk_test_4O3fNOkRCHRclCFelo0yBvYE");

/* POST home page */
router.post('/', function(req, res) {
  var stripeToken = req.body.stripeToken;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var numTicketsBought = req.body.numTicketsBought;
  var priceInDollars = req.body.priceInDollars;

  var db = req.db;
  var collectionName = "July27"
  db.collection(collectionName).insert({
    "firstName": firstName,
    "lastName": lastName,
    "tickets": numTicketsBought,
    "comments": ""
  },{}, function(err, records) {
    if (!err) {
      var charge = stripe.charges.create({
        amount: priceInDollars * 100, // amount in cents, again
        currency: "usd",
        card: stripeToken,
        description: firstName + " " + lastName
      }, function(err, charge) {
        if (!err) {
          res.render('paid', {
            firstName: firstName,
            lastName: lastName,
            quantity: numTicketsBought,
            price: priceInDollars
          });
        } else if (err && err.type === 'StripeCardError') {
          alert(
            "Sorry, your credit card has been declined. Please try a different card."
          )
        } else {
          //TODO email me with error
          alert("Sorry, something went wrong. Please try again. (Don't worry, your card hasn't been charged)");
        }
      });
    } else {
      alert(
        "Something went wrong! Don't worry, your credit card hasn't been charged. Please return to the homepage and try again."
      );
    }
  });

});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'NYC Loft Party'
  });
});

module.exports = router;