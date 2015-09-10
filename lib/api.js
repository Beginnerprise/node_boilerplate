/********************************************************************
 * Libraries - Why we need 'em
 ********************************************************************/
// Centralized Configs
var config = require('../config/config.js');
// Controllable Log Levels
var log = require('iphb-logs');

/********************************************************************
 * Guards
 ********************************************************************/
if (!config.var1) {
  log.error("Need Our Configuration", config, process.env);
  process.exit(1);
}

// TODO: Surely we need more information to run okay

/********************************************************************
 * Privates
 ********************************************************************/

/**
 * @function _privateFunction
 * @description A good description about what this function accomplishes
 * @param    {Function}    callback      Callback format (err,res)
 */
var _privateFunction = function(callback) {
  if (typeof(callback) !== "function") {
    // Libs should only emit error output on a critical - or an exception
    // if unrecoverable
    log.error("_privateFunction didn't get a callback");
    return;
  }
  // Leave upstream to emitting normal logs
  log.debug("Libs should only emit debug/verbose logs");
  // Success
  callback(null, "Worked");
};

/********************************************************************
 * Main Exports
 ********************************************************************/

/**
 * @description Public Exports for this module
 * @type {Object}
 */
var api = {
  /**
   * @function publicFunction
   * @description A solid description of our intentions
   * @param    {Function}    callback      Briefly describe each param
   */
  publicFunction: function(callback) {
    if (typeof(callback) !== "function") {
      // Libs should only emit error output on a critical - or an exception
      // if unrecoverable
      log.error("publicFunction didn't get a callback");
      return;
    }
    _privateFunction(function(err, res) {
      if (err) {
        return callback(err);
      }
      callback(null, res);
    });
  }
};

// Export our api
module.exports = api;

// Use this to enter test code
if (module.parent === null) {

  // Enable test logging output
  log.enable.tests = true;

  api.publicFunction(function(err, res) {
    if (err) {
      return log.warn("Something went wrong with test", err, res);
    }
    log.info("Everything worked out!", res);
  });
}
