/*eslint no-console: "off"*/
/*eslint no-confusing-arrow: "off"*/
"use strict";

const exec = require('child_process').exec;

module.exports = {
  run: command => new Promise(resolve => exec(command, (err, stdout, stderr) => resolve([err, stdout, stderr])))
};

if (module.parent === null) {
  module.exports.run("ls -alF")
    .then(result => result[0] ? console.error(result[2]) : console.log(result[1]))
    .catch(e => console.error(e));
}
