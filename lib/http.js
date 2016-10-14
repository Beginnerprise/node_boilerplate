/*eslint no-ternary: "off"*/
/*eslint global-require: "off"*/
"use strict";

const urlParse = require('url');
const log = require('iphb-logs');
const config = require('../config/config.js');

module.exports = {
  get: url => new Promise((resolve, reject) => {
    const options = typeof url === "object" ? url : urlParse.parse(url);
    const lib = options.protocol.startsWith('https') ? require('https') : require('http');
    options.auth = config.username && config.password ? `${config.username}:${config.password}` : void 0;
    log.debug(`GET Request`);
    log.verbose(options);
    const request = lib.get(options, response => {
      const body = [];
      response.on('data', chunk => body.push(chunk));
      response.on('end', () => resolve([
        response.statusCode,
        response.headers,
        body.join('')
      ]));
    });
    // handle connection errors of the request
    request.on('error', err => reject(err));
  }),
  head: url => new Promise((resolve, reject) => {
    const options = typeof url === "object" ? url : urlParse.parse(url);
    const lib = options.protocol.startsWith('https') ? require('https') : require('http');
    options.method = "HEAD";
    const request = lib.request(options, response => {
      /**
       * Enable resume if no data function:
       *   See:  http://stackoverflow.com/a/23817480
       *   response.resume();
       */
      response.resume();
      response.on('end', () => resolve([
        response.statusCode,
        response.headers
      ]));
    });
    // handle connection errors of the request
    request.on('error', err => reject(err));
    request.end();
  })
};

if (module.parent === null) {
  module.exports.head("https://www.google.com")
    .then(r => log.log(r))
    .catch(e => log.error(e));
}
