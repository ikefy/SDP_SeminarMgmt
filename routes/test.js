var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET test listing. */
router.query('/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[testtbl_1]")
        .into(res, '[]');

});

/* GET single test user. */
router.get('/:id', function (req, res) {
    
    req.sql("SELECT * FROM [dbo].[testtbl_1] where ID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

/* GET seminar listing. */
router.get('/seminar', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarID > 1")
        .into(res, '[]');

});

/* GET single seminar. */
router.get('/seminar/:id', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar] where SeminarID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

module.exports = router;