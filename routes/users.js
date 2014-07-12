var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection('July27').find().toArray(function (err, items) {
        res.json(items);
    });
});

module.exports = router;
