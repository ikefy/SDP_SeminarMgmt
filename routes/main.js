﻿var router = require('express').Router();
var TYPES = require('tedious').TYPES;

router.get('/', function (req, res) { req.sql("SELECT * FROM [dbo].[testtbl_1] for json path").into(res, '[]'); });

router.post('/test/', function (req, res) {
    req.sql("INSERT INTO [dbo].[testtbl_1] ([ID],[FirstName],[LastName]) VALUES (@ID,@lastname,@lastname)")
    .param('ID', req.body.id, TYPES.nchar)
    .param('firstname', req.body.firstname, TYPES.nchar)
    .param('lastname', req.body.lastname, TYPES.nchar)
        .exec(res);
});

/* GET user listing. */
router.get('/api/user/', function (req, res) {
    req.sql("SELECT * FROM [dbo].[user] for json path")
        .into(res, '[]');
});

router.post('/api/user/', function (req, res) {
    req.sql("INSERT INTO [dbo].[user] ([UserLogin],[UserPassword],[UserLastName],[UserFirstName],[UserEmailAddress],[UserDateOfBirth],[UserRole],[UserPhoneNumber],[UserGender])VALUES(@UserLogin,@UserPassword,@UserLastName,@UserFirstName,@UserEmailAddress,@UserDateOfBirth,@UserRole,@UserPhoneNumber,@UserGender)")
    .param('UserLogin', req.body.UserLogin, TYPES.nchar)
    .param('UserPassword', req.body.UserPassword, TYPES.nchar)
    .param('UserFirstName', req.body.UserPassword, TYPES.nchar)
    .param('UserLastName', req.body.UserLastName, TYPES.nchar)
    .param('UserEmailAddress', req.body.UserEmailAddress, TYPES.nchar)
    .param('UserDateOfBirth', req.body.UserDateOfBirth, TYPES.nchar)
    .param('UserRole', req.body.UserRole, TYPES.nchar)
    .param('UserPhoneNumber', req.body.UserPhoneNumber, TYPES.nchar)
    .param('UserGender', req.body.UserGender, TYPES.nchar)
        .exec(res);
});

/* GET single user. */
router.get('/api/user/:id', function (req, res) {

    req.sql("SELECT * FROM [dbo].[user] where UserID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');
});

router.get('/api/user/login/:username/:password', function (req, res) {

    req.sql("SELECT * FROM [dbo].[user] where UserLogin = @username and UserPassword = @password for json path, without_array_wrapper")
        .param('username', req.params.username, TYPES.nchar)
        .param('password', req.params.password, TYPES.nchar)
        .into(res, '[]');
});

router.post('/api/attendees', function (req, res) {
    req.sql("INSERT INTO [dbo].[attendees] ([AttendeeFirstName],[AttendeeLastName],[AttendeeEmailAddress],[AttendeeDateOfBirth],[AttendeePhoneNumber],[AttendeeGender])VALUES(@AttendeeFirstName,@AttendeeLastName,@AttendeeEmailAddress,@AttendeeDateOfBirth,@AttendeePhoneNumber,@AttendeeGender)")
    .param('AttendeeFirstName', req.body.AttendeeFirstName, TYPES.nchar)
    .param('AttendeeLastName', req.body.AttendeeLastName, TYPES.nchar)
    .param('AttendeeEmailAddress', req.body.AttendeeEmailAddress, TYPES.nchar)
    .param('AttendeeDateOfBirth', req.body.AttendeeDateOfBirth, TYPES.nchar)
    .param('AttendeePhoneNumber', req.body.AttendeePhoneNumber, TYPES.nchar)
    .param('AttendeeGender', req.body.AttendeeGender, TYPES.nchar)
        .exec(res);
});

router.post('/api/booking', function (req, res) {
    req.sql("INSERT INTO [dbo].[booking]([BookingStatus],[SeminarID],[RoomID],[UserID])VALUES(@BookingStatus,@SeminarID,@RoomID,@UserID)")
    .param('BookingStatus', req.body.BookingStatus, TYPES.nchar)
    .param('SeminarID', req.body.SeminarID, TYPES.nchar)
    .param('RoomID', req.body.RoomID, TYPES.nchar)
    .param('UserID', req.body.UserID, TYPES.nchar)
        .exec(res);
});

router.post('/api/registration', function (req, res) {
    req.sql("INSERT INTO [dbo].[registrations]([DateRegistered],[RegAttendeeID],[RegSeminarID])VALUES(@DateRegistered,@RegAttendeeID,@RegSeminarID)")
    .param('DateRegistered', req.body.DateRegistered, TYPES.nchar)
    .param('RegAttendeeID', req.body.RegAttendeeID, TYPES.nchar)
    .param('RegSeminarID', req.body.RegSeminarID, TYPES.nchar)
        .exec(res);
});

/* GET seminar listing. */
router.get('/api/seminar/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] as x RIGHT JOIN [dbo].[room] as y on x.SemRoomID = y.RoomID for json path")
        .into(res, '[]');

});

router.post('/api/seminar/', function (req, res) {
    req.sql("INSERT INTO [dbo].[seminar]([SeminarTitle],[SeminarDate],[SeminarStartTime],[SeminarEndTime],[SeminarStatus],[SemRoomID],[SemDescription])VALUES(@SeminarTitle,@SeminarDate,@SeminarStartTime,@SeminarEndTime,@SeminarStatus,@SemRoomID,@SemDescription)")
    .param('SeminarTitle', req.body.SeminarTitle, TYPES.nchar)
    .param('SeminarDate', req.body.SeminarDate, TYPES.nchar)
    .param('SeminarStartTime', req.body.SeminarStartTime, TYPES.nchar)
    .param('SeminarEndTime', req.body.SeminarEndTime, TYPES.nchar)
    .param('SeminarStatus', req.body.SeminarStatus, TYPES.nchar)
    .param('SemRoomID', req.body.SemRoomID, TYPES.nchar)
    .param('SemDescription', req.body.SemDescription, TYPES.nchar)
        .exec(res);
});

/* GET single seminar. */
router.get('/api/seminar/:id', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');
});

/* GET attendees for specific seminar. */
router.get('/api/seminar/:id/attendees', function (req, res) {

    req.sql("SELECT * from [dbo].[registrations] as x RIGHT JOIN [dbo].[attendees] as y on x.RegAttendeeID = y.AttendeeID RIGHT JOIN [dbo].[seminar] as z on x.RegSeminarID = z.SeminarID where RegSeminarID = @id for json path")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');
});


/* GET seminars for September. */
router.get('/api/seminar/daterange/sep', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] as x RIGHT JOIN [dbo].[room] as y on x.SemRoomID = y.RoomID where SeminarDate BETWEEN '2018-09-01' and '2018-09-30' for json path")
        .into(res, '[]');
});

/* GET seminars for October. */
router.get('/api/seminar/daterange/oct', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] as x RIGHT JOIN [dbo].[room] as y on x.SemRoomID = y.RoomID where SeminarDate BETWEEN '2018-10-01' and '2018-10-31' for json path")
        .into(res, '[]');
});

/* GET seminars for October. */
router.get('/api/seminar/daterange/nov', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] as x RIGHT JOIN [dbo].[room] as y on x.SemRoomID = y.RoomID where SeminarDate BETWEEN '2018-11-01' and '2018-11-30' for json path")
        .into(res, '[]');
});

/* GET seminars for October. */
router.get('/api/seminar/daterange/dec', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] as x RIGHT JOIN [dbo].[room] as y on x.SemRoomID = y.RoomID where SeminarDate BETWEEN '2018-12-01' and '2018-12-31' for json path")
        .into(res, '[]');
});

module.exports = router;