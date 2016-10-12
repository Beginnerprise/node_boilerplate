"use strict";

/********************************************************************
 * Configuration
 ********************************************************************/

/*eslint no-process-env: "off"*/
var config = {
  logging: typeof process.env.ENABLE_LOGGING !== "undefined",
  debug: typeof process.env.ENABLE_DEBUG !== "undefined",
  verbose: typeof process.env.ENABLE_VERBOSE !== "undefined",
  serverPort: process.env.PORT || 3000
};

/********************************************************************
 * Export
 ********************************************************************/

module.exports = config;
