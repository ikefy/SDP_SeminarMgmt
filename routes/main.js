﻿var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET user listing. */
router.get('/user/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[user] for json path")
        .into(res, '[]');

});

/* GET single user. */
router.get('/user/:id', function (req, res) {
    
    req.sql("SELECT * FROM [dbo].[user] where UserID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

/* GET seminar listing. */
router.get('/seminar/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar]  for json path")
        .into(res, '[]');

});

/* GET single seminar. */
router.get('/seminar/:id', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

router.get('/seminar/:id/attendees', function (req, res) {

    req.sql("SELECT * from [dbo].[registrations] as x RIGHT join [dbo].[attendees] as y on x.RegAttendeeID = y.AttendeeID where RegSeminarID = @id for json path")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

router.get('/seminar/daterange/sept', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarDate BETWEEN '2018-09-01' and '2018-09-30'")
        .into(res, '[]');

});
module.exports = router;