"use strict";

/********************************************************************
 * Configuration
 ********************************************************************/

/*eslint no-process-env: "off"*/
var config = {
  enableLogging: typeof process.env.ENABLE_LOGGING !== "undefined",
  enableDebug: typeof process.env.ENABLE_DEBUG !== "undefined",
  enableVerbose: typeof process.env.ENABLE_VERBOSE !== "undefined",
  serverPort: process.env.PORT || 3000,
  descriptions: {
    enableLogging: "Enable Basic Logging",
    enableDebug: "Enable Debug Logging",
    enableVerbose: "Enable Verbose Logging",
    serverPort: "Port For Express Server [Default: 3000]"
  }
};

/********************************************************************
 * Export
 ********************************************************************/

module.exports = config;
