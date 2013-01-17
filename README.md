jetfuel-blackbox
================

Currently, BlackBox is a boilerplate client-side application framework, built on top of the JetFuel build system and Grunt, Backbone, RequireJS, JetRunner unit test server (Mocha BDD/TDD test framework + PhantomJS + SauceLabs cloud integration), Dust (and Plate Django port) for templating (both client and server-side), Sass, Express dynamic web server, etc.

BlackBox is the template used for JetFuel's basic `init` command.

You can, of course, use BlackBox as a standalone boilerplate front-end application, but it's meant to be used with the JetFuel build engine...

### System Requirements
* Node/NPM
* JetFuel (https://github.com/peteromano/jetfuel)
* PhantomJS (http://phantomjs.org/)
* Compass (http://compass-style.org/)

### Installing JetFuel
`$ sudo npm install -g jetfuel` (as with all things Unix, if you're "root" user, you should disregard the `sudo` part)

### Running the BlackBox Application
`$ jetfuel init myproject`  
`$ cd myproject`  
`$ npm install` (installs Express and Dust server dependencies)  
`$ jetfuel` (performs a full build* of the project)  
`$ npm start` (starts the Express web server at the default port `3000`)

\* A "full build" includes linting (jshint) source code, installing/upgrading third-party vendor libraries (Jam), documentation of source code (JSDoc), auto-minifying production code, auto-concatenating directories, unit testing (JetRunner), compiling Sass files, and deploying (rsync). Check out `myproject/config/tasks.json` for a list of all JetFuel ready tasks.

### Notes
* As of version 2.2.x, if the JetRunner unit test server hangs, simply run `jetfuel no-test` to bypass JetRunner unit testing (I'm working on this).
* Utility scripts reside under the `bin` folder as shortcuts for building the project and running the server.
* Third-party library dependencies are defined in `myproject/config/vendor.json`, and are managed by the Jam (http://jamjs.org/) package manager.
* Code documentation provided by JSDoc 2.x (http://code.google.com/p/jsdoc-toolkit/).
* Browse around the `myproject/config` directory and `myproject/.jetfuel.json` to learn how to further tweak the build system.
