/*eslint no-console: "off"*/
/*eslint no-confusing-arrow: "off"*/
"use strict";

const spawn = require('child_process').spawn;
const log = require('iphb-logs');
const parse = require('shell-quote').parse;

module.exports = {
  run: command => new Promise((resolve, reject) => {
    const _command = {};
    const _split = parse(command);

    _command.process = _split.shift();
    _command.args = _split;

    log.debug("Running:", command);
    log.verbose("Running:", _command);

    const _proc = spawn(_command.process, _command.args); //, { stdio: "inherit" });

    const _stdOutBuffer = [];
    _proc.stdout.on('data', data => _stdOutBuffer.push(data));

    const _stdErrBuffer = [];
    _proc.stderr.on('data', data => _stdErrBuffer.push(data));

    _proc.on('close', code => code > 0
      ? reject(new Error(`[${code}] ${_stdErrBuffer.join('\n')}`))
      : resolve([code, _stdOutBuffer.join('\n'), _stdErrBuffer.join('\n')]));
  })
};
