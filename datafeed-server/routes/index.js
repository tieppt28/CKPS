var express = require('express');
var url = require('url');
var symbolsDatabase = require('../controllers/symbols_database');
var RequestProcessor = require('../controllers/request-processor').RequestProcessor;
var requestProcessor = new RequestProcessor(symbolsDatabase);
var router = express.Router();

router.use(function(req, res, next) {
    var uri = url.parse(req.url, true);
    var action = uri.pathname;
    var result = requestProcessor.processRequest(action, uri.query, res);
    return result;
})

module.exports = router;
