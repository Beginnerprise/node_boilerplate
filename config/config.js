var config = {
  var1: "some setting",
  var2: process.env.SOME_SETTING
};

module.exports = config;

// Only runs if we are called without an import (as in tests)
if (module.parent === null) {
  log.debug("------------------------------------------------------------------");
  log.debug("Configuration:");
  log.debug("------------------------------------------------------------------");
  for (var key in config) {
    log.debug("  ", key, "=", config[key]);
  }
  log.debug("------------------------------------------------------------------");
}
