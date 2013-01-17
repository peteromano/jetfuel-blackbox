jetfuel-blackbox
================

Currently, BlackBox is a boilerplate client-side application framework, built on top of the JetFuel build system and Grunt, Backbone, RequireJS, JetRunner unit test server (Mocha BDD/TDD test framework + PhantomJS + SauceLabs cloud integration), Dust (and Plate Django port) for templating (both client and server-side), Sass, Express dynamic web server, etc.

BlackBox is the template used for JetFuel's basic `init` command.

You can, of course, use BlackBox as a standalone boilerplate front-end application, but it's meant to be used with the JetFuel build engine...

### System Requirements
* JetFuel (https://github.com/peteromano/jetfuel)
* PhantomJS (http://phantomjs.org/)
* Compass (http://compass-style.org/)

### Installing JetFuel
`$ sudo npm install -g jetfuel` (as with all things Unix, if you're "root" user, you should disregard the `sudo` part)

### Running the BlackBox Application
`$ jetfuel init myproject`  
`$ cd myproject`  
`$ npm install` (installs Express and Dust server dependencies)  
`$ jetfuel`  

Check out `myproject/config/tasks.js` for a list of all JetFuel ready tasks.

### Notes
* As of version 2.2.x, if the JetRunner unit test server hangs, simply run `jetfuel no-test` to bypass JetRunner unit testing (I'm working on this.)
