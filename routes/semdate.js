var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET seminar listing. */
router.get('/seminar', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] for json path")
        .into(res, '[]');

});

/* GET single seminar. */


module.exports = router;