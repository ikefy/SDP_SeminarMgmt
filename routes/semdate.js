var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET seminar listing. */
router.get('/seminar', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] for json path")
        .into(res, '[]');

});

/* GET single seminar. */
router.get('/seminar/daterange/sept', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarDate BETWEEN '2018-09-01' and '2018-09-30'")
        .param('START', req.params.start, TYPES.Date)
        .param('END', req.params.end, TYPES.Date)
        .into(res, '[]');

});

module.exports = router;