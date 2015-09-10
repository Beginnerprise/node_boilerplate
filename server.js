// ***********************************************************************
// Logging
// ***********************************************************************

var log = require('iphb-logs');
// Respect starphleet logging parms
log.enable.logging = process.env.ENABLE_LOGGING ? true : false;
log.enable.debug = process.env.ENABLE_DEBUG ? true : false;
log.enable.verbose = process.env.ENABLE_VERBOSE ? true : false;
log.enable.error = process.env.ENABLE_ERROR ? true : false;

// XXX: A reminder to look at "TODO/XXX" tags and handle them before
// we are production ready
log.warn("Someone left dev code in a production release!!!!");

// ***********************************************************************
// Libraries
// ***********************************************************************

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config/config.js');

// ***********************************************************************
// Route Handlers
// ***********************************************************************

// Add paths for the docs to be served via HTML
app.use('/npmdocs',express.static(__dirname + "/npmdocs"));
app.use('/restdocs',express.static(__dirname + "/restdocs"));

/**
 * @apiDefine failed
 *
 * @apiError (5xx) {string} criticalError There was a critical server error
 * @apiErrorExample Error-Response (500):
 *      HTTP/1.1 500 Error
 *      {
 *        "error": "criticalError"
 *      }
 */

// Default Route
app.get('/', function(req, res) {
  res.redirect('https://github.com/Beginnerprise/node_boilerplate');
});

/**
 * @api {get} /diagnostic Starphleet Healthcheck
 * @apiGroup Healthcheck
 * @apiName diagnostic
 * @apiDescription A normal starphleet healthcheck
 * @apiSuccessExample {string} Success-Response (200):
 *      HTTP/1.1 200 Response
 *      Ok
 * @apiUse failed
 */
app.get('/diagnostic', function(req, res) {
  res.status(200).end('OK');
});


/**
 * @api {get} /publicFunction Validate a Phone Number
 * @apiGroup Example
 * @apiName publicFunction
 * @apiParam {string} example         Example Param
 * @apiDescription Example Description
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {}
 * @apiError (4xx) invalidFormat Example API error
 * @apiErrorExample Error-Response (404):
 *      HTTP/1.1 404 Error
 *      {
 *        "error": "invalidFormat"
 *      }
 * @apiUse failed
 */
app.get('/publicFunction', function(req, res) {
  api.publicFunction(function(err, res) {
    // If err - return a 500
    if (err) {
      return res.status(500).json({"error":"criticalError"});
    }
    // If Format cannot be determined - return 404
    if (res === null) {
      return res.status(404).json({"error":"invalidFormat"});
    }
    // If success, return JSON with 200
    return res.status(200).json(res);
  });
});

// ***********************************************************************
// Start the Express Server
// ***********************************************************************
// Pull the port from starphleet OR fallback to 3000
var serverPort = process.env.PORT || 3000;
// Start your engines...
var server = app.listen(serverPort, function() {
  var host = server.address().address;
  var port = server.address().port;
  // Let the user know we're listening
  log.info('Express listening at http://' + host + ":" + port);
});
