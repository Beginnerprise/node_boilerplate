"use strict";

/********************************************************************
 * Logging
 ********************************************************************/

const config = require("./config/config.js");
const log = require("./lib/log.js").init("server.js");

/********************************************************************
 * Libraries
 ********************************************************************/

/** Hookup Express */
const express = require("express");
const app = express();

/** Configure our body Parser */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/********************************************************************
 * Imports
 ********************************************************************/

const api = require("./lib/api.js");

/********************************************************************
 * Route Handlers
 ********************************************************************/

// Add paths for the docs to be served via HTML
app.use("/npmdocs", express.static(`${__dirname}/npmdocs`));
app.use("/restdocs", express.static(`${__dirname}/restdocs`));

/**
 * @apiDefine failed
 *
 * @apiError (5xx) {string} criticalError There was a critical server error
 * @apiErrorExample Error-Response (500):
 *      HTTP/1.1 500 Error
 *      {
 *        "error": "criticalError"
 *      }
 */

/** Default Route */
app.get("/", (req, res) => res.redirect("https://github.com/Beginnerprise/node_boilerplate"));

/**
 * @api {get} /diagnostic Starphleet Healthcheck
 * @apiGroup Healthcheck
 * @apiName diagnostic
 * @apiDescription A normal starphleet healthcheck
 * @apiSuccessExample {string} Success-Response (200):
 *      HTTP/1.1 200 Response
 *      Ok
 * @apiUse failed
 */
app.get("/diagnostic", (req, res) => res.status(200).end("OK"));
/**
 * @api {get} /publicFunction Validate a Phone Number
 * @apiGroup Example
 * @apiName publicFunction
 * @apiParam {string} example         Example Param
 * @apiDescription Example Description
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 Ok
 *      {}
 * @apiError (4xx) invalidFormat Example API error
 * @apiErrorExample Error-Response (404):
 *      HTTP/1.1 404 Error
 *      {
 *        "error": "invalidFormat"
 *      }
 * @apiUse failed
 */
app.get("/publicFunction", (req, res) => api.publicFunction().then(results => res.status(200).json(results)).catch(() => res.status(500).json({ error: "criticalError" })));

/********************************************************************
 * Start the Express Server
 ********************************************************************/
app.listen(config.serverPort, () =>
  log.info(`${config.appName} listening on ${config.serverPort}`));
