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

// Default Route
app.get('/', function(req, res) {
  res.redirect('https://github.com/Beginnerprise/node_boilerplate');
});

// All starphleet services should include a healthcheck.  Additonally, the
// healthcheck should actually detect if the service is healthy and NOT just
// response with a generic 200 like below
app.get('/diagnostic', function(req, res) {
  res.status(200).end('OK');
});

app.get('/publicFunction', function(req, res) {
  api.publicFunction(function(err, res) {
    if (err) {
      return res.status(500).end('Error: ' + err);
    }
    res.status(200).end(res);
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
