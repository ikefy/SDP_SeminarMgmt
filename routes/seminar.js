﻿var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET seminar listing. */
router.get('/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[seminar]")
        .into(res, '[]');

});

/* GET single seminar. */
router.get('/:id', function (req, res) {
    
    req.sql("SELECT * FROM [dbo].[seminar] where ID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '[]');

});

module.exports = router;