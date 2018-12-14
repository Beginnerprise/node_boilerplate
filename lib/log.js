const debug = require('debug');
module.exports = {
  init: name => ({
    error: debug(`${name}:error`),
    debug: debug(`${name}:debug`),
    info: debug(`${name}:info`),
    warn: debug(`${name}:warn`),
    verbose: debug(`${name}:verbose`)
  })
};
