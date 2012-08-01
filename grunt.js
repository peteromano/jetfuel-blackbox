// All filepaths referenced in any loaded modules are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
  'use strict';

  // Task Definitions - ./grunt/tasks.js
  require('./grunt/tasks')(grunt);

  // Config - ./grunt/config.js
  grunt.initConfig(require('./grunt/config'));

};