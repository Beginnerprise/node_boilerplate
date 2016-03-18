/********************************************************************
 * Libraries - Why we need 'em
 ********************************************************************/
// Flip Bits for verbosity
var log = require('iphb-logs');
// Lots of http requests
var https = require('https');

/********************************************************************
 * Privates
 ********************************************************************/

/**
 * @function _httpPostRequest
 * @descriptions A wrapper for _httpRequest that builds the options object
 *           based on the POST settings
 * @param  {object}   options  A proper http options object
 *                             {
 *                                hostname: $url,
 *                                port: $PORT,
 *                                path: $url,
 *                                method: 'POST' | 'POST',
 *                                headers: {
 *                                  'Content-Type': 'application/json; charset=utf-8',
 *                                  'Content-Length': Buffer.byteLength(data)
 *                                }
 *                             }
 * @param  {object}   data     The stringified JSON for the request
 * @param  {Function} callback Callback (err,result)
 * @return {object}            Result is a JSON.parsed results
 *                             If an error occurs, the exception
 *                             is returned and the 'results' will be
 *                             set to the original payload for retries
 *
 */
var _httpRequest = function(options, data, callback) {

  if (!options.headers) {
    options.headers = {};
  }
  options.headers['User-Agent'] = 'Beta Builder';
  if (typeof(callback) !== "function") {
    callback = function() {};
  }
  var req = https.request(options, function(res) {
    // Always buffer the request
    var _buffer = "";
    res.setEncoding('utf8');
    // As we get chunks we add to the buffer
    res.on('data', function(chunk) {
      _buffer += chunk;
    });
    // ...until the request is done
    res.on('end', function() {
      log.verbose("Http Raw Response:", _buffer);
      var result;
      try {
        result = JSON.parse(_buffer);
      } catch (jsonParseError) {
        callback("JSON Parse Failure In _httpRequest: " + options.path + jsonParseError + "Response:\n" + _buffer, data);
        return;
      }
      callback(null, result);
    });
  });

  req.on('error', function(e) {
    log.debug('Problem with request: ', e.message);
  });

  // Debug foo
  log.debug("Attempting request to:", options.path);
  log.verbose("Post Options:", options);
  log.verbose("Post Data:", data);

  // Send the data object and complete the request
  req.end(data, {
    encoding: 'utf8'
  });

};

/**
 * @function _httpPutRequest
 * @descriptions A wrapper for _httpRequest that builds the options object
 *           based on the POST settings
 * @param  {string}   url      The url for the request; eg /some/url
 * @param  {string}   data     The stringified JSON for the request
 * @param  {Function} PUT Callback (err,result)
 * @return {object}            Result is a JSON.parsed results
 *
 * See: _httpRequest
 */
var _httpPutRequest = function(url, data, callback) {

  // Make the dataz empty
  if (!data) {
    data = "";
  }

  var options = {
    hostname: h.host,
    port: h.port,
    path: url,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  if (process.env.DEVMODE) {
    log.verbose("Devmode Adding Credentials:", url);
    options.auth = process.env.UN + ':' + process.env.PW;
  }

  _httpRequest(options, data, callback);

};

/**
 * @function _httpDeleteRequest
 * @descriptions A wrapper for _httpRequest that builds the options object
 *           based on the POST settings
 * @param  {string}   url      The url for the request; eg /some/url
 * @param  {string}   data     The stringified JSON for the request
 * @param  {Function} callback Callback (err,result)
 * @return {object}            Result is a JSON.parsed results
 *
 * See: _httpRequest
 */
var _httpDeleteRequest = function(url, data, callback) {

  // Make the dataz empty
  if (!data) {
    data = "";
  }

  var options = {
    hostname: h.host,
    port: h.port,
    path: url,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  if (process.env.DEVMODE) {
    log.verbose("Devmode Adding Credentials:", url);
    options.auth = process.env.UN + ':' + process.env.PW;
  }

  _httpRequest(options, data, callback);

};

/**
 * @function _httpPostRequest
 * @descriptions A wrapper for _httpRequest that builds the options object
 *           based on the POST settings
 * @param  {string}   url      The url for the request; eg /some/url
 * @param  {string}   data     The stringified JSON for the request
 * @param  {Function} callback Callback (err,result)
 * @return {object}            Result is a JSON.parsed results
 *
 * See: _httpRequest
 */
var _httpPostRequest = function(url, data, callback) {

  // Make the dataz empty
  if (!data) {
    data = "";
  }

  var options = {
    hostname: h.host,
    port: h.port,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  if (process.env.DEVMODE) {
    log.verbose("Devmode Adding Credentials:", url);
    options.auth = process.env.UN + ':' + process.env.PW;
  }

  _httpRequest(options, data, callback);

};

/**
 * @function _httpGetRequest
 * @descriptions A wrapper for _httpRequest that builds the options object
 *           based on the GET settings
 * @param  {string}   url      The url for the request; eg /some/url
 * @param  {string}   data     The stringified JSON for the request
 * @param  {Function} callback Callback (err,result)
 * @return {object}            Result is a JSON.parsed results
 *
 * See: _httpRequest
 */
var _httpGetRequest = function(url, data, callback) {

  // Guards
  if (typeof(callback) !== "function") {
    throw new Error("_httpRequest called without a callback");
  }
  // Make the dataz empty
  if (!data) {
    data = "";
  }

  var options = {
    hostname: h.host,
    port: h.port,
    path: url,
    method: 'GET'
  };

  if (process.env.DEVMODE) {
    log.verbose("Devmode Adding Credentials:", url);
    options.auth = process.env.UN + ':' + process.env.PW;
  }

  _httpRequest(options, data, callback);

};

// Expose 'em publically
var h = {
  host: "",
  port: 443,
  get: _httpGetRequest,
  post: _httpPostRequest,
  delete: _httpDeleteRequest,
  put: _httpPutRequest
};

module.exports = h;
