/********************************************************************
 * Libraries - Why we need 'em
 ********************************************************************/
// Centralized Configs
const config = require('../config/config.js');
// Controllable Log Levels
const log = require('iphb-logs');

/********************************************************************
 * Guards
 ********************************************************************/

// TODO: Surely we need more information to run okay

/********************************************************************
 * Privates
 ********************************************************************/

/**
 * @function _privateFunction
 * @description A good description about what this function accomplishes
 * @param    {Function}    callback      Callback format (err,res)
 */
function _privateFunction(options) {
  return new Promise(resolve => resolve(options));
}

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
  publicFunction: options => _privateFunction(options)
    .then(o => o)
    .catch(e => e)
};

// Export our api
module.exports = api;

/********************************************************************
 * Tests
 ********************************************************************/

if (module.parent === null) {

  // Enable test logging output
  log.enable.tests = true;

  log.debug(config);

  api.publicFunction()
    .then(r => log.success("Everything worked out!", r))
    .catch(e => log.fail("Something went wrong with test", e));
}
