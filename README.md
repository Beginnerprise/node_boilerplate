# Boiler Plate Node Project
An opinionated [boiler plate](https://github.com/Beginnerprise/node_boilerplate) for node modules.  

## Why another boilerplate
The strength of this boilerplate is in the automated reusability of code.  In a single repo, you write your code once and it is quickly adaptable to be any of the following forms:

  - Command line accessible for cron jobs
  - REST accessible
  - NPM module

The high level idea is to facilitate code re-use and a uniform code base but give the consumer options on usage.

## Main Components
The point of using this structure is to allow your code to quickly be deployed to Starphleet as a REST service when necessary but also providing the flexibility for the exact same functionality via NPM.  Additionally, the template for command line usage automatically allows environment overrides for specific cron scenarios.

### Key Principle - Isolation of Concerns
The main point is to write your functional code in a way that is agnostic to how it's called.  Specifically, your functional code does not include anything specific to express or command line environments.  Instead, the code is written as an NPM module and then 'used' by the 'server.js' and 'command' components of this boilerplate.

### Where To Add your functional code
To articulate the point, a quick example of a function that adds two numbers.  Your 'add' code would be contained in the "lib" folder.  You want to create a single file that hooks together the rest of your exported code.  The boilerplate is [already setup](https://github.com/Beginnerprise/node_boilerplate/blob/master/package.json#L5) to export the [api.js](https://github.com/Beginnerprise/node_boilerplate/blob/master/lib/api.js#L5) file.  

If your functional code is tiny perhaps it is appropriate to fit into a single file (api.js).  If your functional code continues to need to break out into smaller components - make sure the "api.js" file is the only file needed in a `require`.  

```javascript
const thisApp = require("./lib/api.js");
```

**All functionality should be exposed by requiring the single file above.**

### Example NPM Modules

For now, let's just include the following in our api.js:

```javascript
const config = require('../config/config.js');
const log = require('iphb-logs');

/********************************************************************
 * Main Exports
 ********************************************************************/

/**
 * @description Public Exports for this module
 * @type {Object}
 */
module.exports = {
  /**
   * @function addTwoNumbers
   * @description Add Two Numbers and return the result
   * @param    {int}    numberOne      An integer
   * @param    {int}    numberTwo      An integer
   * @return   {int}                   The values added together
   */
  addTwoNumbers: (numberOne, NumberTwo) => Promise.resolve(numberOne + NumberTwo)
};

/********************************************************************
 * Tests
 ********************************************************************/

if (module.parent === null) {

  log.enable.tests = true;
  log.debug(config);
  module.exports.addTwoNumbers(1,1)
    .then(r => r === 2 ? log.success("addTwoNumbers worked") : log.fail("addTwoNumbers failed"))
    .catch(e => log.fail("Something went wrong with test", e, e.stack || "No Stack Trace"));
}
```

### Exposing via REST
Now you can use the `server.js` file included in this boilerplate to expose the functionality of your code as a REST endpoint.  Never write your code in such a way that it needs the `request` or `response` objects provided from node's express package.  Instead, isolate all the web specific functionality to the `server.js` file.

Example:

```javascript
app.get('/addTwoNumbers', (req, res) => api.addTwoNumbers(req.query.numberOne, req.query.numberTwo)
  .then(result => res.status(200).json({ result }))
  .catch(() => res.status(500).json({ "error": "criticalError" })));
```

### Utilizing the same code in cron jobs
At the bottom of the [command boilerplate](https://github.com/Beginnerprise/node_boilerplate/blob/master/bin/command#L113) included in this repo, you can add and run your npm code easily from the command line.  For instance, you could call your addTwoNumbers function from the above example like:

```javascript
api.addTwoNumbers(config.numberone, config.numbertwo)
  .then(r => log.info(`Success: ${r}`))
  .catch(e => log.error(`Error: ${e}`));
```

Adding command line options is as easy as modifying the [help text](https://github.com/Beginnerprise/node_boilerplate/blob/master/bin/command#L38-L54).  Options configured in the help text automatically populate the variable "config[$option]".  For instance, to add the above `numberone` and `numbertwo` arguements, all we need to do is amend the help text like so:

```javascript
const help = `
Usage:
  command [options] -r <requiredparam>
  command [options]
Options:
  -c --config                      Display the Environment
  -d --debug                       Enable Debug Output
  -h --help                        Show this help
  -l --log                         Enable Log Output
  -o --numberone <number>          The first number to add
  -t --numbertwo <number>          The second number to add
  -v --verbose                     Enable Verbose Output
Additional Options:
${_configOverrides.join('\n')}
A generic command documentation you should change
`;
```

This command line tool is making use of docopts.  If you aren't familiar with this package you can read more about it [here](http://bit.ly/1EQXdRe).

### Configuration
By centralizing the [config](https://github.com/Beginnerprise/node_boilerplate/blob/master/config/config.js#L9) into a single file we enable overrides for dev, cron, and starphleet in various ways easily.  For instance, the command line cron job may want to specify some of the config as part of the options to the command line.  The example [command template](https://github.com/Beginnerprise/node_boilerplate/blob/master/bin/command#L51) includes the ability to automatically override any environment config as part of the arguments.

Let's say you normally set your server through the environment variable "OUR_SERVER".  Let's say that environment is assigned to config.ourServer.  You would then be able to set this on the command line like:

```bash
./bin/command --ourServer "Different Server"
```

You can explore more basic toys by running the command included in this boilerplate with `-h`.

### Tests
At the bottom of each file in your "lib" folder there is a section for quick tests.  This code will be executed only when the module is run directly and not included as a module.  You can put any coding scenarios in this section
