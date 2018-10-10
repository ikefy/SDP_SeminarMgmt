var router = require('express').Router();
var TYPES = require('tedious').TYPES;
const axios = require('axios');


axios.get('https://ikefy.github.io/SDP_SeminarMgmt/')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            // Get text 
            console.log("------- with axios module -------")
            console.log($.text());
            // Get HTML 
            //console.log($.html());
        }
    })
    .catch((err) => {
        throw new Error(err);
    });

/* GET user listing. */
router.get('/api/user/', function (req, res) {
    req.sql("SELECT * FROM [dbo].[user] for json path")
        .into(res, '[]');
});

/* GET single user. */
router.get('/api/user/:id', function (req, res) {
    
    req.sql("SELECT * FROM [dbo].[user] where UserID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

/* GET seminar listing. */
router.get('/api/seminar/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar]  for json path")
        .into(res, '[]');

});

/* GET single seminar. */
router.get('/api/seminar/:id', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');
});

/* GET attendees for specific seminar. */
router.get('/api/seminar/:id/attendees', function (req, res) {

    req.sql("SELECT * from [dbo].[registrations] as x RIGHT join [dbo].[attendees] as y on x.RegAttendeeID = y.AttendeeID where RegSeminarID = @id for json path")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');
});

/* GET seminars for September. */
router.get('/api/seminar/daterange/sept', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarDate BETWEEN '2018-09-01' and '2018-09-30' for json path")
        .into(res, '[]');
});

/* GET seminars for October. */
router.get('/api/seminar/daterange/oct', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarDate BETWEEN '2018-10-01' and '2018-10-31' for json path")
        .into(res, '[]');
});

module.exports = router;