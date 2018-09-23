var router = require('express').Router();
var TYPES = require('tedious').TYPES;

/* GET task listing. */
router.get('/', function (req, res) {

    req.sql("SELECT * FROM [dbo].[testtbl_1]  for json path, without_array_wrapper")
        .into(res, '{}');

});

/* GET single task. */
router.get('/:id', function (req, res) {
    
    req.sql("SELECT * FROM [dbo].[testtbl_1] where ID = @id for json path, without_array_wrapper")
        .param('ID', req.params.id, TYPES.nchar)
        .into(res, '{}');

});

module.exports = router;