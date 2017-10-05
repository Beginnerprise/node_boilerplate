/*eslint no-ternary: "off"*/
/*eslint global-require: "off"*/
"use strict";

const urlParse = require('url');
const log = require('iphb-logs');
const config = require('../config/config.js');

const _request = (method, url, data) => new Promise((resolve, reject) => {
  const options = typeof url === "object" ? url : urlParse.parse(url);
  const lib = options.protocol.startsWith('https') ? require('https') : require('http');
  options.auth = config.username && config.password ? `${config.username}:${config.password}` : undefined;
  options.method = method;
  options.headers = options.headers || {};
  options.headers["content-type"] = "application/json";
  log.debug(`Request Method: ${options.method}`);
  log.verbose(options);
  const request = lib.request(options, response => {
    const body = [];
    response.on('data', chunk => body.push(chunk));
    response.on('end', () =>
      response.statusCode > 399
      ? reject([response.statusCode, response.headers, body.join('')])
      : resolve([response.statusCode, response.headers, body.join('')]));
  });
  // handle connection errors of the request
  request.on('error', err => reject(err));
  request.end(typeof data === "object" ? JSON.stringify(data) : data || "");
});

module.exports = {
  get: url => _request("GET", url),
  head: url => _request("HEAD", url),
  delete: url => _request("DELETE", url),
  post: (url, data) => _request("POST", url, data)
};
