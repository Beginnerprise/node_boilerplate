# Boiler Plate Node Project
An opinionated [boiler plate](https://github.com/Beginnerprise/node_boilerplate) for node modules.  

## Why another boilerplate
Some projects should be written with the idea that they may be exposed via a service OR included as a module for usage.  This boilerplate is intended as a tiny quickstart for making a new node module.  The idea is that on npm include you will slurp in the api.js.  There is also an equivalent set of REST calls exposed through express via the server.js file.  

Using this format we can easily deploy the functionality of our module using [Starphleet](https://github.com/wballard/starphleet) while making it easy for others to also include the functionality with a simple '''npm install'''.
