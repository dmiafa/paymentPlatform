var express = require('express');
var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var router = express.Router();

/*
 * GET userlist
 */
router.get('/', function(req, res) {
  var db = req.db;
  var collectionName = "July27"

  getList(db, function(items) {
    res.render('guestlist', {
      guests: items
    });
  });
});

router.post('/', function(req, res) {
    var db = req.db;
    var collectionName = "July27"
    var recordsToChange = JSON.parse(req.body.recordsToChange);
    console.log(req.body)
    for (var i = 0; i < recordsToChange.length; i++) {
      var o_id = new BSON.ObjectID(recordsToChange[i]);
      db.collection(collectionName).update({
          "_id": o_id

        }, {'$set':{
            'comments': req.body[recordsToChange[i]]
}
          },
          function(err, result) {
            if (!err) {
              console.log("yay!")
            }
          });
      }
      getList(db, function(items) {
        res.render('guestlist', {
          guests: items
        });
      });
    })

  var getList = function(db, callback) {
    var collectionName = "July27"
    db.collection(collectionName).find().toArray(function(err, items) {
      callback(items);
    });
  }

  module.exports = router;